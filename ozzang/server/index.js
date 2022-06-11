const _ = require("lodash");
// express 모듈 가져오기
const express = require("express");
const app = express(); // express app 생성

const port = 5001;

// application/json 형태로 된 정보를 분석해서 가져올 수 있게 한다.
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
// application/x-www-form-urlencoded 형태로 된 정보를를 분석해서 가져올 수 있게 한다.
app.use(bodyParser.urlencoded({ extended: true }));

// cookie-parser 이용.
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// for s3 access
const AWS = require("aws-sdk");
AWS.config.loadFromPath("./s3_config.json");
const s3Bucket = new AWS.S3({ params: { Bucket: "ozzang-upload-bucket" } });
const S3_BUCKET_URL =
  "https://ozzang-upload-bucket.s3.ap-northeast-2.amazonaws.com";
const config = require("./config/key");

const { auth } = require("./middleware/auth");
const { User } = require("./models/User");
const { Clothes } = require("./models/Clothes");

const mongoose = require("mongoose");
const { Style } = require("./models/Style");
mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => console.log("err"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// 회원가입 라우터 register router
app.post("/api/users/register", (req, res) => {
  // 회원 가입 시 필요한 정보들을 클라이언트에서 가져와서 -> 데이터베이스에 넣어준다.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  }); // MongoDB method
});

// 로그인 라우터
app.post("/api/users/login", (req, res) => {
  // 1. 요청된 이메일을 DB에 있는지 찾기.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    // 2. 요쳉된 이메일이 DB에 있다면, 비밀번호가 같은지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      // 3. 비밀번호가 맞다면 유저를 위한 토큰 생성하기.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에? 쿠키/로컬스토리지/ 등등 -> 일단은 쿠키에 하자!
        res
          .cookie("x_auth", user.token)
          .cookie("email", user.email)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

// 인증 라우터 부분
app.post("/api/users/auth", auth, (req, res) => {
  // middleware인 auth를 통과하고 오게 되면 아래 실행!
  // Authentication이 true
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    userTel: req.user.userTel,
  });
});

// 로그아웃 라우터
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    { token: "" },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

// 옷 업로드 라우트
app.post("/api/clothes/upload", async (req, res) => {
  // 옷 정보에 필요한 정보를 클라이언트에서 가져와서
  // 데이터베이스에 넣어준다.

  // base64 decoding.
  const base64EncodedImage = req.body.img;
  const decodedImage = new Buffer.from(
    base64EncodedImage.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const type = base64EncodedImage.split(";")[0].split("/")[1];
  const key = Math.random().toString(36).substring(2, 11);

  // s3 upload 위한 변수
  let s3uploadData = {
    Key: `${key}.${type}`,
    Body: decodedImage,
    ContentEncoding: "base64",
    ContentType: `image/${type}`,
  };

  // s3 upload 및 upload 완료 까지 대기.
  await s3Bucket.putObject(s3uploadData).promise();
  console.log("successfully uploaded the image!");

  let row = {
    useremail: req.body.useremail,
    name: req.body.name,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    season: req.body.season,
    purchasePlace: req.body.purchasePlace,
    purchaseDate: req.body.purchaseDate,
    imgUrl: `${S3_BUCKET_URL}/${key}.${type}`,
  };

  const clothes = new Clothes(row);
  clothes.save((err, doc) => {
    if (err)
      return res.json({
        success: false,
        err,
      });
    return res.status(200).json({
      success: true,
    });
  });
});

// 옷 정보 조회 cookie 받아서, user의 email, 폰번호, 등등 받아오기
app.get("/api/users/getUserInfo", (req, res) => {
  const token = req.cookies.x_auth;
  User.findOne({ token: token }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.json(user);
  });
});

app.get("/api/clothes/listing", (req, res) => {
  // 옷 정보 가져오기 ( 조회 )
  const sName = req.query.name;
  const temp = {
    category: req.query.category,
    season: req.query.season,
    fav: req.query.fav === "true",
  };
  let search = _.pickBy(temp, _.identity);
  Clothes.find(
    {
      useremail: req.cookies.email,
      name: { $regex: sName, $options: "i" },
      ...search,
    },
    (err, clothes) => {
      if (!clothes) {
        return res.json({
          clotehsSearchSuccess: false,
          message: "해당 정보에 맞는 옷이 없습니다.",
        });
      } else {
        return res.json({
          success: true,
          clothes,
        });
      }
    }
  );
});

// 옷 상세정보 조회
app.get("/api/clothes/:clothId", (req, res) => {
  // 옷 정보 가져오기 ( 조회 )
  Clothes.find(
    // { name: req.body.name, uploader: req.body.email },
    { useremail: req.cookies.email, _id: req.params.clothId },
    (err, clothes) => {
      if (!clothes) {
        return res.json({
          clotehsSearchSuccess: false,
          message: "해당 정보에 맞는 옷이 없습니다.",
        });
      } else {
        return res.json({
          success: true,
          cloth: clothes[0],
        });
      }
    }
  );
});

// 옷 즐겨찾기 설정 및 해제 동작
app.post("/api/clothes/updateFav", (req, res) => {
  Clothes.findOne({ _id: req.body._id }, (err, cloth) => {
    if (err) return res.json({ success: false, err });
    Clothes.findOneAndUpdate(
      { _id: req.body._id },
      { fav: !cloth.fav },
      (err, cloth) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
          success: true,
        });
      }
    );
  });
});

app.post("/api/style/upload", async (req, res) => {
  // base64 decoding.
  const base64EncodedImage = req.body.img;
  const decodedImage = new Buffer.from(
    base64EncodedImage.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const type = base64EncodedImage.split(";")[0].split("/")[1];
  const key = Math.random().toString(36).substring(2, 11);

  // s3 upload 위한 변수
  let s3uploadData = {
    Key: `${key}.${type}`,
    Body: decodedImage,
    ContentEncoding: "base64",
    ContentType: `image/${type}`,
  };

  // s3 upload 및 완료 대기.
  await s3Bucket.putObject(s3uploadData).promise();
  console.log("successfully uploaded the image!");

  let row = {
    useremail: req.body.useremail,
    name: req.body.name,
    season: req.body.season,
    imgUrl: `${S3_BUCKET_URL}/${key}.${type}`,
    description: req.body.description,
    clotheslist: req.body.clotheslist,
  };

  const clothes = new Style(row);
  clothes.save((err, doc) => {
    if (err)
      return res.json({
        success: false,
        err,
      });
    return res.status(200).json({
      success: true,
    });
  });
});

// 스타일 목록, 정보 가져오기 (조회)
app.get("api/style/listing", (req, res) => {
  Style.find({
    useremail: req.cookies.email,
    ...req.query,
  })
    .populate("clotheslist")
    .exec((err, style) => {
      console.log(data);
      if (!data) {
        return res.join({
          styleSearchSuccess: false,
          messaage: "해당 정보에 맞는 스타일이 없습니다.",
        });
      } else {
        return res.json({
          success: true,
          data,
        });
      }
    });
});

// 옷 정보 업데이트
app.post("api/clothes/update", async (req, res) => {
  // base64 decoding.
  const base64EncodedImage = req.body.img;
  const decodedImage = new Buffer.from(
    base64EncodedImage.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const type = base64EncodedImage.split(";")[0].split("/")[1];
  const key = Math.random().toString(36).substring(2, 11);

  // s3 upload 위한 변수
  let s3uploadData = {
    Key: `${key}.${type}`,
    Body: decodedImage,
    ContentEncoding: "base64",
    ContentType: `image/${type}`,
  };

  // s3 upload 및 완료 대기.
  await s3Bucket.putObject(s3uploadData).promise();
  console.log("successfully uploaded the image!");

  Clothes.findOneAndUpdate(
    {
      _id: req.body._id,
    },
    {
      name: req.body.name,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      season: req.body.season,
      purchasePlace: req.body.purchasePlace,
      purchaseDate: req.body.purchaseDate,
      imgUrl: `${S3_BUCKET_URL}/${key}.${type}`,
    },
    (err, newClothes) => {
      if (err)
        return res.json({
          ClothesupdateSuccess: false,
          err,
        });
      return res.status(200).send({
        ClothesUpdateSuccess: true,
      });
    }
  );
});

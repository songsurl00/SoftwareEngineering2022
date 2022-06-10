const express = require("express");
// express 모듈 가져오기
const app = express(); // express app 생성
const port = 5001;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// for s3 access
const AWS = require("aws-sdk");
AWS.config.loadFromPath("./s3_config.json");
const s3Bucket = new AWS.S3({ params: { Bucket: "ozzang-upload-bucket" } });

// application/x-www-form-urlencoded 형태로 된 정보를를 분석해서 가져올 수 있게 한다.
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 형태로 된 정보를 분석해서 가져올 수 있게 한다.
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());

const { auth } = require("./middleware/auth");
const { User } = require("./models/User");
const { Clothes } = require("./models/Clothes");

const mongoose = require("mongoose");

const config = require("./config/key");

const S3_BUCKET_URL =
  "https://ozzang-upload-bucket.s3.ap-northeast-2.amazonaws.com";

mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => console.log("err"));

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
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

app.post("/api/clothes/upload", async (req, res) => {
  // 옷 업로드 라우트
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
  let s3uploadData = {
    Key: `${key}.${type}`,
    Body: decodedImage,
    ContentEncoding: "base64",
    ContentType: `image/${type}`,
  };

  await s3Bucket.putObject(s3uploadData).promise();
  console.log("successfully uploaded the image!");

  // s3Bucket.putObject(s3uploadData, function (err, s3uploadData) {
  //   if (err) {
  //     console.log(err);
  //     console.log("Error uploading data: ", s3uploadData);
  //   } else {
  //     console.log("successfully uploaded the image!");
  //   }
  // });

  // S3 image upload

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
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/clothes/listing", (req, res) => {});

// 옷 정보 조회 cookie 받아서, user의 email, 폰번호, 등등 받아오기
app.get("/api/users/getUserInfo", (req, res) => {
  const token = req?.cookie?.x_auth;
  User.findOne({ token: token }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.json(user);
  });
});

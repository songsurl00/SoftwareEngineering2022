const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const saltRounds = 10;
// salt를 이용해서 비밀번호를 암호화 한다. -> 그러기 위해 salt 생성
// saltRounds => salt가 몇자리 값인지
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 25,
  },
  email: {
    type: String,
    trim: true, // trim = true 면 빈칸을 없애준다.
    unique: 1, // 같은 email을 등록하지 못하게 한다. -> 중복 방지
  },
  password: {
    type: String,
    minlength: 8,
  },
  userTel: {
    type: String,
    maxlength: 13,
  },
  role: {
    // 일반 사용자 권한 or 관리자 권한 등을 나눌 수 있음.
    type: Number,
    default: 0,
  },
  token: {
    // 토큰을 이용해 나중에 유효성을 관리할 수 있다.
    type: String,
  },
  tokenExp: {
    // 토큰의 유효기간을 설정한다.
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  // .pre  = mongoose method
  var user = this;

  if (user.isModified("password")) {
    // 비밀번호 암호화
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err); // 에러처리

      bcrypt.hash(user.password, salt, function (err, hash) {
        // hash => 암호화된 비밀번호
        if (err) return next(err);
        // Store hash in your password DB.
        user.password = hash;
        next();
      });
    });
  } else {
    // 비밀번호를 변경하지 않을 때는 pre X -> 넘겨주기.
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // 비밀번호 비교
  // plainPassword => hash 해야함
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;
  // jsonwebtoken 이용하여 token 생성
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  // 나중에 secretToken 으로 이 아이디의 유저가 누구인지 확인할 수 있다.
  // 해당 secretToken 을 decode 해서 지금 접속한 user 정보를 알아낼 수 있다.

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  // 토큰을 decode 한다.
  jwt.verify(token, "secretToken", function (err, decoded) {
    // decoded 에 유저ID 저장됨
    // 클라이언트에서 가져온 token 과 DB저자된 토큰이 일치하는지 확인

    user.findOne(
      {
        // mongoDB METHOD
        _id: decoded,
        token: token,
      },
      function (err, user) {
        if (err) return cb(err);
        cb(null, user);
      }
    );
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };

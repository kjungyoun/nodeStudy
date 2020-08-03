const express = require("express");
const app = express();
const cookieParser = requir("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./passport");
//미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secreyKey")); //? cookiePaser시작 후 session 다음 passport 하는것이 안전 --> 순서가 중요!
app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, //! 클라이언트에서 쿠키를 확인할 수 없도록 함
      secure: false, //! false인 경우 https가 아닌 곳에서도 사용가능
    },
  })
);
app.use(passport.initialize()); //? passport 설정을 시작한다.
app.use(passport.session()); //!session으로 인증하겠다.
passportConfig(); //?passport의 전략이 들어가는 곳
//라우터

//서버시작
app.listen(9000, () => {
  console.log("server start");
});

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const authRouter = require("./api/routes/auth.router");
const morgan = require("morgan");
const passport = require("passport");
const passportConfig = require("./passport");
const db = require("./models");

// todo: express 미들웨어 등록
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secretKey")); //? key 값
app.use(
  session({
    secret: "secretKey", //? 필수 항목으로 cookie-parser의 비밀키 역할을 한다
    resave: false, //? 요청이 왔을 때 세션의 수정이 없어도 세션을 다시 저장할지에 대한 설정
    saveUninitialized: true, //? 세션에 저장할 내역이 없더라도 세션을 저장할지에 대한 설정(보통 방문자를 추적할 때 사용)
    httpOnly: true, //? true이면 클라이언트에서 쿠키를 확인할 수 없음
    secure: false, //? false일 경우 https가 아닌 환경에서도 사용 가능하게 함 (배포 시에는 반드시 true로 두어 보안에 문제가 되지 않도록 해야함)
  })
);
// passport를 express에 등록
app.use(passport.initialize()); //? 무조건 등록을 해야함(req.login등을 셋팅해줌)
app.use(passport.session()); //? 내부적으로 세션을 사용 (세션을 사용하지 않으면 지워도 무관!)
// passport 설정(세션처리, 전략)
passportConfig(); // passport 설정 실행

//todo: 로그 출력 (라우터 밑에서 호출하면 로그가 찍히지 않음! 주의!!)
app.use(morgan("dev"));

//todo: 라우터
app.use("/auth", authRouter);

//todo: 에러 핸들러
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Not Found" });
});

//todo: Server start
db.sequelize
  .sync({ force: false }) //force가 true면 서버를 재실행할 때마다 db를 초기화해서 다시 만들어 주는 것
  .then(() => {
    //then은 성공적으로 실행될 경우 실행되는 코드
    console.log("디비 연동 성공");
    app.listen(9000, () => {
      console.log("Server Start!");
    });
  })
  .catch((err) => {
    //catch는 error가 나면 err를 처리하는 코드
    console.error(err);
    console.log("디비 연동 실패");
  });

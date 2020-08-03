const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const authRouter = require("./api/routes/auth.router");

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

//todo: 라우터
app.use("/auth", authRouter);

//todo: 에러 핸들러
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Not Found" });
});

//todo: Server start
app.listen(9000, () => {
  console.log("Server Start!");
});

const LocalStrategy = require("passport-local").Strategy;
module.exports = () =>
  new LocalStrategy({ usernameField: "email", passwordField: "password" }, (email, password, done) => {
    try {
      //? email과 password로 찾은 유저가 있다고 가정
      const user = {};
      done(null, user);

      //? 만약에 email 또는 password가 틀렸다면
      done(null, false, { message: "이메일 또는 비밀번호가 틀립니다." });
    } catch (err) {
      console.log(err);
      done(err);
    }
  });

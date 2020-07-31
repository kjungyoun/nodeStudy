const passport = require("passport");
const local = require("./strategy/local");

module.exports = () => {
  passport.serializeUser((user, done) => {
    //? user는 user의 정보이고 user.id는 회원db의 primary Key 값으로 session을 만들어 주는 것
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    try {
      //! 세션에 저장되어 있는 id 값으로 db에서 user를 찾아오는 코드
      const user = db.find(id);
      if (user) done(null, user);
      else done(null, false, { message: "유저를 못찾았다." });
    } catch (err) {
      console.log(err);
      done(err);
    }
  });

  //전략
  passport.use(local());
};

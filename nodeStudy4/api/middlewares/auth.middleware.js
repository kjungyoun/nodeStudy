const bcrypt = require("bcrypt"); //? 평문을 암호화하기 위한 모듈
const passport = require("passport");
const { User } = require("../../models");

module.exports = {
  loginProcess: (req, res, next) =>
    passport.authenticate("local", { session: true }, (err, user, info) => {
      console.log("authenticate 실행");
      if (err) {
        console.error(err); //? 에러시 에러를 출력하고 err를 리턴하는 이유는 이후 코드에 영향을 주지 않기 위함
        return next(err);
      }
      // user가 false일 때 info= {message:이유} 안에 message가 있도록 해야함
      // 전략안에 done(에러, 유저|false, 정보)
      // ex) done(null, false, {message: '비밀번호가 틀렸습니다.})
      if (!user) return res.status(403).json({ success: false, message: info.message }); //403은 금지(forbiden), 유저가 없는경우(비밀번호 틀림, 아이디틀림)

      // passport가 express req에 만들어준 메서드
      req.login(user, (loginError) => {
        //로그인중에 에러가 뜨면 서버에러로 처리!
        if (loginError) {
          console.error(loginError);
          return next(loginError); // statusCode : 500 next는 500에러 코드인 서버에러를 나타냄
        }
        const jsonUser = user.toJSON(); // 여기서 user는 local에서 전달해준 user로 toJSON은 sequelize 타입인 models라는 타입을 JSON형식으로 바꿔주는 것
        delete jsonUser.password; // jsonUser에서 password의 노출을 방지하기 위해 지웠다.
        res.status(200).json({ success: true, message: "로그인 성공!", user: jsonUser });
      });
    })(req, res, next), //? 인자를 두개를 받는 것이 커링함수라고 한다.
  //! authenticate 은 첫번째로 전략, session을 사용할 것인지? (기본값 =true, json 웹토큰이면 무조건 false로 해야함)

  //? sequelize 대표 메소드 = findOne({}), findAll({}),create({}), update({},{}), destroy({})

  registerProcess: async (req, res, next) => {
    //! register router에 접근시 실행할 middleware를 정의함
    const { email, password, name } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (user) {
        //? user가 존재하는지 검사
        return res.status(409).json({ success: false, message: "이미 가입한 이메일" }); //? 유저가 있는 경우 이미 가입한 이메일이라는 에러를 출력
      }

      const salt = await bcrypt.genSalt(10); //? salt는 암호를 더 어렵게 해주는 역할
      const hashPassword = await bcrypt.hash(password, salt); //? password를 salt를 추가하여 hash로 암호화 함
      await User.create({ email, password: hashPassword, name }); //create는 sequlize에서 제공해주는 메소드
      res.status(201).json({ success: true, message: "회원가입 성공" });
    } catch (err) {
      if (conn) conn.release();
      console.log(err);
      next(err);
    }
  },

  isNotLoggedIn: (req, res, next) => {
    if (req.isUnauthenticated()) next();
    //passport가 isUnauthenticated라는 메소드를 정의해준 것
    else res.status(403).json({ success: false, message: "로그인이 필요 없음" }); //로그인이 되있는 상태에서 로그인을 또 시도할때
  },

  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) next();
    //passport가 isAuthenticated라는 메소드를 정의해준 것
    else res.status(403).json({ success: false, message: "로그인이 필요함" }); //로그인이 되어있는지 확인
  },

  logoutProcess: (req, res, next) => {
    req.logOut();
    req.session.destroy();
    res.status(201).send("logout ok");
    //json
    //end
  },
}; //? 인증을 위한 미들웨어

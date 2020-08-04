const passport = require("passport");
const getConn = require("../config/database/db.pool");
const local = require("./strategy/local");

function passportConfig() {
  // 패스포트 설정

  // 세션을 사용할 경우
  //todo: 세션 데이터에 유저의 정보(email, id:PK, path, ...)
  //todo: 첫 로그인 시에만 동작하는 메서드
  passport.serializeUser((user, done) => {
    console.log("serializeUser 실행");
    done(null, user.id); //세션에 id 값을 추가해서 저장함
  });

  //todo: 로그인 후에 api 요청을 할 때마다 동작 (http는 비연결성이기 때문에 사용자의 정보를 기억하지 못하므로 요청할 때마다 정보를 세션으로 보내줘야 함)
  //todo:req.user를 만들어주는 것이 deserializeUser
  //todo: 저장된 세션 정보와 사용자가 보낸 쿠기가 동일한지 확인
  passport.deserializeUser(async (id, done) => {
    //id는 user.id와 같음
    console.log("deserializeUser 실행");
    let conn = null;
    let err = null;
    let user = null;
    try {
      conn = await getConn(); // 데이터베이스 연동이기 때문에 await으로 비동기를 블록해주는 코드는 try에 다 들어가고 커넥션을 가져와서
      const [[row]] = await conn.query("select * from user where id = ?", [id]); // 유저를 찾는다
      user = row;
    } catch (error) {
    } finally {
      // 에러든 성공하든 항상 실행되는 코드
      if (err) {
        console.error(err);
        done(err);
      } else if (conn) conn.release();
      else if (user) done(null, user);
      else done(null, false, { message: "사용자를 찾지 못했다." });
    }
  });

  // 전략
  // 패스포트의 미들웨어로 전략을 등록 (passport.use)
  passport.use(local()); //로컬 local을 더블클릭하고 컨트롤 + 스페이스바를 누르면 local.js파일이 auto import 된다
  //   passport.use()//네이버
  //   passport.use()//구글
  //   passport.use()//페이스북
}

module.exports = passportConfig; //passportConfig를 내보냄

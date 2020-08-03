const getConn = require("../../config/database/db.pool");
const bcrypt = require("bcrypt"); //? 평문을 암호화하기 위한 모듈

module.exports = {
  loginProcess: (res, req, next) => {},
  registerProcess: async (res, req, next) => {
    //! register router에 접근시 실행할 middleware를 정의함
    let conn = null;
    const { email, password, name } = req.body;
    try {
      conn = await getConn(); //? connection을 불러옴
      const [[user]] = await conn.query("select * from user where email = ?", [email]); //? db의 열은 배열안에 배열이므로 한 값을 검색할 때 배열 안에 배열로 조회
      if (!user) {
        //? user가 존재하는지 검사
        conn.release();
        return res.status(409).json({ success: false, message: "이미 가입한 이메일" });
      }

      const salt = await bcrypt.genSalt(10); //? salt는 암호를 더 어렵게 해주는 역할
      const hashPassword = await bcrypt.hash(password, salt); //? password를 salt를 추가하여 hash로 암호화 함

      await connect.execute("INSERT INTO user(email,password,name) VALUES(?,?,?)", [email, hashPassword, name]);
      conn.release();
      res.status(201).json({ success: true, message: "회원가입 성공" });
    } catch (err) {
      if (conn) conn.release();
      console.log(err);
      next(err);
    }
  },
}; //? 인증을 위한 미들웨어

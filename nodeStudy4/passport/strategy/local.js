const bcrypt = require("bcrypt");
const { User } = require("../../models");
const LocalStrategy = require("passport-local").Strategy;

function local() {
  return new LocalStrategy(
    { usernameField: "email", passwordField: "password" }, // 옵션값으로 req.body안에 담겨오는 param의 값
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } }); //sql문이 이렇게 바뀜
        if (!user) done(null, false, { message: "이메일이 틀립니다." });
        // 사용자가 없어서 error는 아니므로 null이고 사용자가 없으므로 false이고 info로 메세지를 출력하는 done
        else if (!(await bcrypt.compare(password, user.password)))
          // bcrypt의 compare메서드로 입력한 패스워드와 사용자 패스워드를 비교하여 boolean으로 리턴
          done(null, false, { message: "비밀번호가 틀립니다." });
        else done(null, user);
        conn.release();
      } catch (error) {
        if (conn) conn.release();
        console.error(error);
        done(error); // 이 에러가 authenticate에 err에 담겨 거기서 처리가 된다.
      }
    }
  );
}

module.exports = local;

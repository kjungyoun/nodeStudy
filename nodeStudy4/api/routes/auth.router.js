const { registerProcess, loginProcess } = require("../middlewares/auth.middleware");

const router = require("express").Router();

/**
 * @description 로그인
 * @route POST/auth/login
 * @body {email, password}
 */
router.post("/login", loginProcess);

/**
 *@description 회원가입
 *@route POST/auth/register
 *@body {email, password, name}
 */
router.post("/register", registerProcess); //? middleware에 만들어 놓은 registerProcess를 불러온다.

module.exports = router;

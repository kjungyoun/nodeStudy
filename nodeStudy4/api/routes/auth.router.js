const { registerProcess, loginProcess, isLoggedIn, logoutProcess, isNotLoggedIn } = require("../middlewares/auth.middleware");

const router = require("express").Router();

/**
 * @description 로그인
 * @route POST/auth/login
 * @body {email, password}
 */
router.post("/login", isNotLoggedIn, loginProcess); //순차적으로 실행

/**
 *@description 회원가입
 *@route POST/auth/register
 *@body {email, password, name}
 */
router.post("/register", isNotLoggedIn, registerProcess); //? middleware에 만들어 놓은 registerProcess를 불러온다.

/**
 * @description 로그아웃
 * @route POST/auth/logout
 */
router.post("/logout", isLoggedIn, logoutProcess);

module.exports = router;

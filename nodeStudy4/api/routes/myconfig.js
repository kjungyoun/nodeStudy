const { isLoggedIn } = require("../middlewares/auth.middleware");
const router = require("./auth.router");
const { getUserById, modifyUserPassword } = require("../../controllers/user");

//todo: 모든 라우터에서 로그인 확인
router.use(isLoggedIn); //미들웨어를 등록함으로써 이 라우터는 로그인이 되었는지 항상 검사하도록 함

/**
 * @description 프로필 정보 불러오기
 * @route GET/user
 * @response {success, message?, user?}
 */
router.get("/", getUserById);

/**
 *@description 비밀번호 수정하기
 *@route PATCH/user/password
 *@request @body {newName}
 *@response {success,message}
 */
router.patch("/password", modifyUserPassword);

// controller는 db를 조회하여 데이터를 가지고 작업, middleware는 db에서 데이터를 조회할 필요 없는 작업
module.exports = router;

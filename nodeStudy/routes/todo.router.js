const router = require("express").Router();
const { getTodoList, createTodo, modifyTodo, removeTodo } = require("../controllers/todo.controller");
const { postValid, putValid } = require("../middleware/vaildator"); //? 값의 유효성을 검사하는 모듈

/**
 * @description 리스트 조회 --> REST API (get,post,delete,put등으로 나누는 규칙을 정의)
 * @function
 * @route GET /todo/list
 */
router.get("/", getTodoList);

/**
 * @description todo 생성
 * @route POST /todo
 */
router.post("/", postValid, createTodo);

/**
 * @description todo 삭제
 * @route DELETE /todo/:todoId
 */
router.delete("/:id", removeTodo);

/**
 * @description todo 수정
 * @route  PUT or PATCH /todos/:todoId  --> PUT은 전체를 다 수정, PATCH는 일부만 수정
 */
router.put("/:id", putValid, modifyTodo);

module.exports = router;

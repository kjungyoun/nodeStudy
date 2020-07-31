const getConn = require("../utils/getConnection");

module.exports = {
  getTodoList: async (req, res, next) => {
    try {
      const conn = await getConn();
      const [row] = await conn.query("select * from todo");
      conn.release();
      res.status(200).json(row);
    } catch (error) {
      next(err); //statusCode 500으로 return == res.status(500).json
    }
  },
  modifyTodo: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const conn = await getConn();
      const todo = await conn.execute("UPDATE todo SET content = ? WHERE id = ?", [content, id]);
      const [row] = await conn.query("select * from todo where id =?", [id]);
      conn.release();
      res.status(200).json({ success: true, todo: row[0] });
    } catch (error) {
      next(error);
    }
  },
  createTodo: async (req, res, next) => {
    try {
      //클라이언트에서 받아옴
      const { content } = req.body;
      const conn = await getConn();
      await conn.execute("INSERT INTO todo(content) VALUES(?)", [content]);
      conn.release();
      res.status(201).json({ success: true });
    } catch (error) {
      next(error);
    }
  },
  removeTodo: async (req, res, next) => {
    try {
      const { id } = req.params;
      const conn = await getConn();
      await conn.execute("DELETE FROM todo WHERE id=?", [id]);
      res.status(204).end;
    } catch (error) {
      next(error);
    }
  },
};

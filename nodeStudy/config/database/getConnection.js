const pool = require("./config"); //? config.js에서 만든 pool을 가져옴

module.exports = () => {
  const conn = pool.getConnection((conn, err) => {});
  return conn;
};

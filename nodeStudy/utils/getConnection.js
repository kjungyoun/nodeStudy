const mysql = require("mysql2/promise"); //? promise가 가독성을 좋게 해줌
const dbConfig = require("../config/database/database.config");

//* creat pool
const pool = mysql.createPool(dbConfig);

module.exports = function () {
  //? == module.exports = () => pool.getConnection();
  return pool.getConnection(); //! 함수를 내보내는 것
};

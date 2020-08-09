const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development"; // NODE_ENV 파일이 없다면 development를 가져온다.
const config = require("../config/config.json")[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config); //데이터베이스를 만들어주는 sequelize 객체를 정의
const db = {};
db.User = require("./user")(sequelize, Sequelize.DataTypes); // sequelize와 DataTypes는 User를 불러서 User의 인자값을 넣어주는 것이다.
db.Post = require("./post")(sequelize, Sequelize.DataTypes);
db.Comment = require("./comment")(sequelize, Sequelize.DataTypes);

//! 관계설정
/**
 * @description 게시판 데이터베이스
 * @models {User,Post,Comment}
 * @relationship {Like} 관계로 '좋아요'를 사용
 */
Object.keys(db).forEach((modelName) => {
  //여기에서 keys는 User,Post,Comment가 된다. 따라서 modelName은 User, Post, Comment의 이름이 되고
  if (db[modelName].associate) {
    //각 모델의 associate가 있으면
    db[modelName].associate(db); // associate를 실행한다.
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

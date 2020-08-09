module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // post가 belongsTo라는 것으로 정의했기 때문에 UserId라는 컬럼이 자동으로 생성된다.
    },
    { charset: "utf8mb4", collate: "utf8mb4_general_ci" } //한글 뿐만 아니라 이모티콘도 인식할 수 있는 utf8mb4
  ); //괄호안에 테이블명, 컬럼옵션, 테이블 옵션

  Post.associate = (db) => {
    // hasOne은 일대일 관계를 의미
    db.Post.belongsTo(db.User); //Post는 user에 속해 있다.
    db.Post.hasMany(db.Comment);
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
  };
  return Post;
};

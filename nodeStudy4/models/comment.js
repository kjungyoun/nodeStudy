module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment", //테이블명
    {
      //컬럼명 및 옵션
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { charset: "utf8mb4", collate: "utf8mb4_general_ci" } //테이블 옵션
  );

  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};

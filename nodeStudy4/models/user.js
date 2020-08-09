module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      //id값은 sequelize가 자동으로 생성해주고 autoIncrement도 해준다. 따라서 따로 만들 필요 x
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    { charset: "utf8", collate: "utf8_general_ci" }
  ); //괄호안에 테이블명, 컬럼옵션, 테이블 옵션

  User.associate = (db) => {
    db.User.hasMany(db.Post); // User가 Post를 여러개 가질 수 있다. 즉 일대다 관계
    db.User.hasMany(db.Comment); //User가 Comment를 여러개 가질 수 있다.
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" }); // User가 Post에 속해 있으면서 많이 가진다는 의미로 다대다 관계를 나타낸다.
    //thruough 는 다대다 관계에서 만들어지는 테이블의 이름, 별명을 의미한다.
  };
  return User;
};

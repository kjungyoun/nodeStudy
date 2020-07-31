require("dotenv").config();

//* connection pool config
module.exports = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "test",
  waitForConnections: true, //? false일 경우 connection pool의 제한 수 이상의 인원은 error로 표시하여 지금 db를 사용하고 있는 사람을 기다리지 않음
  connectionLimit: 4, //! connection할 수 있는 사용자 수의 제한 여기서는 4명이 넘어가게 되면 waitForconnecions 옵션값에 따라 기다릴지 아니면 error창을 띄우고 기다리지 않을지 결정
  //옵션 추가
};

// function getConn() {
//   return pool.getConnection((conn) => conn); //? Promise(conn)
// }

// const getConn = () => pool.getConnection((conn) => conn); //! getConn을 선언하면서 pool.getConnection을 실행하면서 리턴한 것 '() =>' 이것처럼 -> 옆에 {}이런 중괄호 없이 바로 값이나 메소드가 있으면 그것이 바로 return값이다
// module.exports = { getConn }; //? 이 pool을 다른 곳에서 쓸 수 있도록 빼낸다

// function test() {
//   return new Promise((resolve, reject) => {});
// }

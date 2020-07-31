const mysql = require("mysql2/promise"); // promise 비동기를 동기로 바꾸는 식

function getConn(conn, err) {
  if (err) throw new Error(err);
  else return conn; // error가 안나면 connection을 conn에 담는다
}

(async function () {
  const pool = await mysql.createPool({
    // db에 연결하기 위한 pool 생성
    host: "localhost",
    user: "root",
    password: "kjw15915",
    database: "o2",
    waitForConnections: true, // false일 경우 connection pool의 제한 수 이상의 인원은 error로 표시하여 지금 db를 사용하고 있는 사람을 기다리지 않음
    connectionLimit: 4,
  });

  // ![conn1, conn2, conn3, conn4]
  // ! const connArr = await Promise.all([  // 얘는 connection을 동시사용자에게 순차적이 아닌 한번에 연결을 처리 await은 한줄 한줄 실행하고 멈추는데  이때 생기는 병목현상을 줄일 수 있음, 즉 한줄 한줄 처리하는데 걸리는 시간 중
  //! 가장 오래걸리는 시간에 맞추어 전체 코드가 그 시간안에 한번에 수행
  //     pool.getConnection(getConn),
  //     pool.getConnection(getConn),
  //     pool.getConnection(getConn),
  //     pool.getConnection(getConn)
  // ]);
  // console.log("연결 성공", connArr.length);

  const conn1 = await pool.getConnection(getConn);
  const conn2 = await pool.getConnection(getConn);
  const conn3 = await pool.getConnection(getConn);
  const conn4 = await pool.getConnection(getConn);
  conn1.release(); // release 함수를 사용하여 pool하나를 반환함으로서 '연결 성공'이 출력될 수 있다.
  const conn5 = await pool.getConnection(getConn);

  // const que = await conn2.query("select * from topic");
  // const exe = await conn2.execute("select * from topic");
  // console.log ("que : ", que);
  // console.log ("exe : ", exe);

  const [row] = await conn2.query("select * from topic");
  const [exRow] = await conn2.execute("select * from topic");
  console.log("que : ", row[0].id);
  console.log("exe : ", exRow[0].id);

  console.log("연결 성공");
})(); // 함수를 만듬과 동시에 실행시킴 ()()

// ? 일급객체 -> 콜백 -> 콜백지옥이라는 단점 -> es6 2015 프로미스 -> 가독성문제 -> es7 2016 async/await
// todo 주석
//! 주석
//* 주석

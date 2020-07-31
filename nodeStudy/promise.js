const readline = require("readline"); //!readline이라는 모듈을 불러옴
const r1 = readline.createInterface({
  //?인터페이스를 만듬
  input: process.stdin,
  output: process.stdout,
});

// r1.on("line", (input) => {
//   console.log(input); //? 입력을 받아서 출력
// }).on("close", () => {
//   //? chainnig
//   console.log("클로즈 실행");
// });

let list = [];

function readLine() {
  //! == 4
  return new Promise((resolve, reject) => {
    r1.on("line", (input) => {
      if (input.length > 20) reject(Error("20글자 이상"));
      resolve(input);
      r1.close();
    });
  });
}

function testTimer() {
  //! == 6
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("2초 뒤 실행");
    }, 2 * 1000); //? 이 콜백함수를 2000ms 이후에 실행한다!
  });
}

async function main() {
  //! 순서 == 2
  try {
    const input = await readLine(); //? readLine함수가 실행될 때 까지 기다린다. 즉 여기서 input은 readLine함수에서 resolve에 담은 input값을 main의 input값으로 넣어놓은다. 순서 == 3
    console.log("입력 받은 값 : ", input);
    const timer = await testTimer(); //! 순서 == 5
    console.log(timer);
  } catch (err) {
    console.log(input);
    console.log("reject 발생");
  }
}
main(); //! 처음으로 실행하는 곳 즉, main함수를 실행!  순서 == 1

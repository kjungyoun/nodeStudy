const rl = require("readline").createInterface({ input: process.stdin, output: process.stdout });

const list = [];
rl.on("line", (input) => {
  list.push(input);
}).on("close", () => {
  list.shift(); //! 리스트의 인자 중 맨 첫번째 인자를 밀어서 없앤다.
  sorted(list);
});

function sorted(list) {
  // for (var i = 0; i < list.length; i++) {
  //   for (var j = i; j < list.length; j++) {
  //     var a = parseInt(list[i].split(" ")[0]);
  //     var b = parseInt(list[j].split(" ")[0]);
  //     if (a > b) {
  //       var temp = list[i];
  //       list[i] = list[j];
  //       list[j] = temp;
  //       console.log("changed!");
  //     }
  //   }
  // }
  // //   list.sort();
  // for (var i = 0; i < list.length; i++) {
  //   console.log(list[i]);
  // }
  var result = [];
  for (let i of list) {
    var [age, name] = i.split(" ");
    result.push({ age, name });
  }
  console.log(result);
  result.sort((a, b) => a.age - b.age); //? 오름차순 정렬, (b-a는 내림차순 정렬) 여기서 a,b는 각각의 객체를 의미
  result.forEach((value) => console.log(`${value.age} ${value.name}`)); //? forEach는 리스트의 각 인자를 for문으로 출력하기 위한 메소드
}

//? https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort  --> sort의 자세한 설명

const rl = require("readline").createInterface({ input: process.stdin, output: process.stdout });

const list = [];
rl.on("line", (input) => {
  list.push(input);
}).on("close", () => {
  list.shift();
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
  result.sort((a, b) => a.age - b.age);
  result.forEach((value) => console.log(`${value.age} ${value.name}`));
}

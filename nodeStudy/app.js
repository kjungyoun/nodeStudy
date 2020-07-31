const express = require("express");
const app = express();
const morgan = require("morgan"); //! 로그를 찍어주는 미들웨어를 호출 (npm에서 morgan install)
const todoRouter = require("./routes/todo.router");

//todo: setting
app.set("port", 9004);

// todo: body parser & middlwware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// todo: logger 로그를 찍어주는 역할
app.use(morgan("dev"));

// todo: router
app.use("/todo", todoRouter);

// todo: listen
app.listen(app.get("port"), () => {
  console.log("server start");
});

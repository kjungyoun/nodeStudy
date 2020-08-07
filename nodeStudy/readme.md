# app.js 기본설정

### 💪node.js에 데이터 베이스 연동 및 todo 라우터 만들기

- 데이터베이스를 node.js에 연동하기 위해서는 기본 기능을 제공해주는 express 모듈과 mysql2, 그리고 로그를 출력하는 기능을 도와주는 morgan 모듈을 npm을 이용해 설치합니다.

```bash
npm i express mysql2 morgan
```

*위와 같이 npm 모듈을 한번의 코드로 한번에 다운이 가능합니다.

- 모듈을 설치했으면 우선 app.js 에서 사용할 모듈을 불러옵니다.

```jsx
const express = require("express");
const app = express();
const morgan = require("morgan"); 
const todoRouter = require("./routes/todo.router");
```

- morgan은 로그를 찍어주는 미들웨어로 위에서 설치한 모듈을 불러오는 것입니다.
- todoRouter는 이후에 저희가  만들 todoRouter를 app.js와 연결시키는 겁니다.

- 이렇게 필요한 모듈들을 require 해온 다음 서버를 위한 기본 설정을 해줍니다,

```jsx
//todo: setting
app.set("port", 9004);

// todo: body parser & middlwware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// todo: logger 
app.use(morgan("dev"));

// todo: router
app.use("/todo", todoRouter);

// todo: listen
app.listen(app.get("port"), () => {
  console.log("server start");
});
```

- **todo: setting** 은 우리가 사용할 서버의 port number를 셋팅하는 것입니다.
- **todo: body parser & middleware**에서 bodyParser란 **API 요청에서 받은 body 값을 파싱하는 역할을 수행하는 것**이 bodyParser 라는 미들웨어입니다.
- 따라서 위와 같이 코드를 작성할 경우 이렇게 설정한 후 클라이언트 측에서 { name: 'yejinh', job: ...} 와 같은 JSON 형식의 바디를 보내면 서버 측에서 req.body 혹은 [req.body.name](http://req.body.name/) , req.body.job 등으로 해당 데이터에 곧바로 접근할 수 있게 됩니다.
- urlencoded 안에 extended는 기본값이 true 입니다.

**여기서 파싱이란?**
가지고 있는 데이터를 내가 원하는 형태의 데이터로 ‘가공'하는 과정을 parsing 이라 하며 그 과정을 수행하는 모듈 혹은 메소드를 parser 라 일컫습니다.

- 이후 logger는 로그를 찍어주는 역할입니다.
- router는 우리가 localhost:8080인 서버를 열 때 이후에  기본적으로 주소 route를 '/todo'로 설정하여 우리가 실제로 사용하는 주소는 [localhost:8080/todo가](http://localhost:8080/todo가) 되도록 만드는 것입니다.
- listen은 실제로 우리가 설정한 port number에 서버를 열고 log에 "server start"라는 로그 메세지를 출력하도록 설정하는 코드입니다.

→Paser와 bodyParser에 대한 자세한 설명

[express 미들웨어 body-parser 모듈](https://velog.io/@yejinh/express-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4-bodyParser-%EB%AA%A8%EB%93%88)

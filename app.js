const express = require("express");
const app = express();
const port = 3000;

const postsRouter = require("./routes/post.js");
// const commentsRouter = require("./routes/comments.js");

const connect = require("./schemas");
connect();

app.use(express.json());
app.use("/", [postsRouter]);

// body-parser를 써서 req.body에 들어와 있는 데이터를 정상적으로 보고 싶을 때 쓴다.
// Request 객체 안에 있는 req.body를 사용하기 위해서는 이 코드를 작성해야된다.body-parser Middleware를 쓰기 위한 문법이다.(app.use를 통해서 = 실제 모든 미들웨어에 적용하겠다.)

app.get("/", (req, res) => {
  res.send("localhost:3000 first server");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸다.");
});

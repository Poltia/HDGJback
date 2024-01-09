const express = require("express");
const session = require("express-session");
const cors = require("cors");
const { sequelize } = require("./models");
const jwt = require("jsonwebtoken");
const dot = require("dotenv");
dot.config();

// 서버 객체 생성
const app = express();

// router 불러오기
const indexRouter = require("./routes");
const adminRouter = require("./routes/admin");
const blogRouter = require("./routes/blog");

// sequelize 연결 및 테이블 생성
sequelize
  .sync({ force: false }) // true => 강제로 초기화
  .then(() => console.log("Database 연결"))
  .catch((error) => console.log("ERROR: ", error));

// 프론트 연결
app.use(cors({ origin: "http://127.0.0.1:5173" })); // 배포 URL

// 전달받은 객체 형태를 해석해서 사용할 수 있게
app.use(express.json());

// 세션 사용준비
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

// router 설정
app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/admin/blog", blogRouter);

// 포트 생성
const PORT = 8080;
app.set("port", PORT);
app.listen(app.get("port"), () => console.log(PORT + "번 포트 사용"));

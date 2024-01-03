const express = require("express");
const session = require("express-session");
const cors = require("cors");
const { sequelize, Admin, Blog } = require("./models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dot = require("dotenv");
dot.config();

// 서버 객체 생성
const app = express();

// sequelize 연결 및 테이블 생성
sequelize
  .sync({ force: false }) // true => 강제로 초기화
  .then(() => console.log("Database 연결"))
  .catch((error) => console.log("ERROR: ", error));

// 포트 생성
const PORT = 8080;
app.listen(PORT, () => {
  console.log(PORT + "번 포트 사용");
});

// 포트 연결
const URL = process.env.FRONT_URL;
const options = { origin: URL };
app.use(cors(options));

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

// 로그인
app.post("/login", async (request, response) => {
  const { id, password } = request.body;
  const admin = await Admin.findOne({ where: { admin_id: id } }).then(
    (element) => {
      if (element) {
        bcrypt.compare(password, element.password, (_, same) => {
          if (same) {
            response.send({ isLogin: true, session: request.session });
          } else response.send(false);
        });
      } else response.send(false);
    }
  );
});

// 회원가입
app.post("/singup", async (request, response) => {
  const { id, password } = request.body;
  const admin = await Admin.findOne({ where: { admin_id: id } });
  if (!admin) {
    bcrypt.hash(password, 10, (_, data) => {
      Admin.create({
        admin_id: id,
        password: data,
      }).then(() => {
        console.log(id + " 가입완료");
        response.send("admin 등록 완료");
      });
    });
  } else response.send("아이디 중복");
});

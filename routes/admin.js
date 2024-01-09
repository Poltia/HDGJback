const router = require("express").Router();
const bcrypt = require("bcrypt");
const { Admin } = require("../models");

// 로그인
router.post("/login", async (request, response) => {
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
router.post("/signup", async (request, response) => {
  const { id, password } = request.body;
  const admin = await Admin.findOne({ where: { admin_id: id } });
  if (!admin) {
    bcrypt.hash(password, 5, (_, data) => {
      Admin.create({
        admin_id: id,
        password: data,
      }).then(() => {
        console.log(id + " 가입완료");
        response.send(`${id} 등록 완료`);
      });
    });
  } else response.send("아이디 중복");
});

module.exports = router;

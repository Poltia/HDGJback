const router = require("express").Router();
const { Blog } = require("../models");

// blog 추가
router.post("/add", async (request, response) => {
  const { selected, title, subtitle, date, thumb, link } = request.body;
  const blog = await Blog.findOne({ where: { link: link } });
  if (!blog) {
    Blog.create({
      where: selected,
      title: title,
      subtitle: subtitle,
      date: date,
      thumb: thumb,
      link: link,
    }).then(() => {
      console.log("블로그 추가");
      response.send("블로그가 추가 되었습니다.");
    });
  }
});

// blog 불러오기
router.post("/load", async (request, response) => {
  const { where } = request.body;
  await Blog.findAll({ where: { where: where } }).then((blogs) =>
    response.send(blogs)
  );
});

module.exports = router;

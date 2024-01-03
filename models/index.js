const Sequelize = require("sequelize");

const config = require("../config");
const Admin = require("./admin");
const Blog = require("./blog");

// sequelize 객체 생성
const sequelize = new Sequelize(
  config.dev.database,
  config.dev.username,
  config.dev.password,
  config.dev
);

const DB = {};
DB.sequelize = sequelize;
DB.Admin = Admin;
DB.Blog = Blog;

Admin.init(sequelize);
Blog.init(sequelize);

module.exports = DB;

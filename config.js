const dot = require("dotenv");
dot.config();

const config = {
  dev: {
    username: "HDGJ",
    password: process.env.DB_PASSWORD,
    database: "HDGJ",
    host: process.env.DB_URL,
    dialect: "mysql",
  },
};

module.exports = config;

const Sequelize = require("sequelize");

class Blog extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: { type: Sequelize.STRING(225), allowNull: false },
        date: { type: Sequelize.STRING(225), allowNull: false, unique: true },
        thumb: { type: Sequelize.STRING(255), allowNull: false },
        link: { type: Sequelize.STRING(225), allowNull: false },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Blog",
        tableName: "blog",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
}

module.exports = Blog;

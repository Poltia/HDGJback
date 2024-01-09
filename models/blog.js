const Sequelize = require("sequelize");

class Blog extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        where: { type: Sequelize.STRING(20), allowNull: false },
        title: { type: Sequelize.STRING(225), allowNull: false },
        subtitle: { type: Sequelize.STRING(225), allowNull: true },
        date: { type: Sequelize.STRING(225), allowNull: false },
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

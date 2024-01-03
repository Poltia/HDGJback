const Sequelize = require("sequelize");

class Admin extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        admin_id: { type: Sequelize.STRING(20), allowNull: false },
        password: { type: Sequelize.STRING(20), allowNull: false },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Admin",
        tableName: "admin",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
}

module.exports = Admin;

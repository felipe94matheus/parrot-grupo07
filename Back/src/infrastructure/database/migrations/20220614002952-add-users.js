'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "users",
      "adm",
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "adm")
  }
};

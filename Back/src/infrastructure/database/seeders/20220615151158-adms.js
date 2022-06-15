'use strict';

const { faker } = require("@faker-js/faker")
const UserService = require("../../../domain/users/services/userService")

const mockPassword = UserService.cripPass("123456")

let seed = []

for(let i=0; i<10; i++) {
  seed.push(
    {
      name: faker.name.findName(),
      email: faker.internet.email(),
      appartment: faker.random.numeric(4),
      password: mockPassword,
      status: true,
      adm: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  )
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", seed)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {})
  }
};

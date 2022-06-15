'use strict';

const { faker } = require("@faker-js/faker");
// import bcrypt from "bcryptjs";

// const senha = bcrypt.hashSync("123456", 10);

let seed = []

for(let i=0; i<10; i++) {
  seed.push(
    {
      name: faker.name.findName(),
      email: faker.internet.email(),
      appartment: faker.random.numeric(4),
      password: faker.internet.password(),
      status: faker.datatype.boolean(),
      adm: faker.datatype.boolean(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  )
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", seed);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  }
};

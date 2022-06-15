'use strict';

const { faker } = require("@faker-js/faker");

let seed = []

for(let i=1; i<=10; i++) {
  seed.push(
    {
      content: faker.random.alpha(100),
      createdAt: new Date(),
      updatedAt: new Date(),
      user_id: i,
    }
  )
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("posts", seed);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("posts", null, {});
  }
};

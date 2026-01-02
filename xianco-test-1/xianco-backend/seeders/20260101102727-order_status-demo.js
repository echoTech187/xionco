'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('order_statuses', [
      {
        name: 'PENDING',
      },
      {
        name: 'PROSES',
      },
      {
        name: 'DELIVERED',
      },
      {
        name: 'SUCCESS',
      },
      {
        name: 'CANCELED',
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('order_statuses', null, {});

  }
};

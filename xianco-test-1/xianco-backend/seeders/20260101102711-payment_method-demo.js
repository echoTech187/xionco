'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('payment_methods', [
      {
        name: 'QRIS',
      },
      {
        name: 'Transfer',
      },
      {
        name: 'Cash',
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('payment_methods', null, {});
  }
};

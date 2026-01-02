'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('payment_statuses', [
      {
        name: 'MENUNGGU_PEMBAYARAN',
      },
      {
        name: 'SUDAH_BAYAR',
      },
      {
        name: 'GAGAL_BAYAR',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('payment_statuses', null, {});

  }
};

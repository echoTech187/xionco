'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('customers', [
      {
        name: 'Suryono',
      },
      {
        name: 'Joko Sugiyono',
      },
      {
        name: 'Dwi Setiawan',
      },
      {
        name: 'Budi Santoso',
      },
      {
        name: 'Andi Wijaya',
      },
      {
        name: 'Rudi Jatmiko',
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('customers', null, {});

  }
};

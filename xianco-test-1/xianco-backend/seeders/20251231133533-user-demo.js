'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const bcrypt = require('bcryptjs');
    await queryInterface.bulkInsert('users', [{
      slug: 'admin',
      fullname: 'Admin Xionco',
      username: 'admin',
      email: 'admin@xionco.com',
      phone_number: null,
      password: await bcrypt.hash('Xionco@123', 10),
      is_online: false,
      last_online_at: new Date(),
      is_active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }
};

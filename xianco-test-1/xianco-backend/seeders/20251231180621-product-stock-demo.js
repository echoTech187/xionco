'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const [products] = await queryInterface.sequelize.query('SELECT id FROM products');

    if (products.length > 0) {
      const productStocks = products.map(product => ({
        product_id: product.id,
        current_stock: Math.floor(Math.random() * 100) + 10, // Random stock between 10 and 110
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      await queryInterface.bulkInsert('product_stocks', productStocks, {});
    }
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('product_stocks', null, {});
     
  }
};

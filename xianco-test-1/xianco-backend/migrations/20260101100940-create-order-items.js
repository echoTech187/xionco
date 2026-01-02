'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      order_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id'
        }
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      quantity: {
        type: Sequelize.DECIMAL(10, 0),
        allowNull: false,
        defaultValue: 1
      },
      product: {
        type: Sequelize.JSON,
        allowNull: true
      },
      price: {
        type: Sequelize.DECIMAL(10, 0),
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(10, 0),
        allowNull: false,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_items');
  }
};
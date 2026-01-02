'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      customer_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      customer_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      payment_method_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      payment_method: {
        type: Sequelize.STRING,
        allowNull: false
      },
      payment_status_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      order_status_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      total_price: {
        type: Sequelize.DECIMAL(10, 0),
        allowNull: false,
        defaultValue: 0
      },
      order_item: {
        type: Sequelize.JSON,
        allowNull: true
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
    await queryInterface.dropTable('orders');
  }
};
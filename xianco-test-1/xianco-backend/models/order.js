'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Order.belongsTo(models.Customer, {
        foreignKey: 'customer_id',
        as: 'customer'
      })

      Order.belongsTo(models.PaymentMethod, {
        foreignKey: 'payment_method_id',
        as: 'payment_method'
      })

      Order.belongsTo(models.PaymentStatus, {
        foreignKey: 'payment_status_id',
        as: 'payment_status'
      })

      Order.belongsTo(models.OrderStatus, {
        foreignKey: 'order_status_id',
        as: 'order_status'
      })

      Order.hasMany(models.OrderItem, {
        foreignKey: 'order_id',
        as: 'order_items'
      })
    }
  }
  Order.init({
    customer_id: DataTypes.BIGINT,
    customer_name: DataTypes.STRING,
    payment_method_id: DataTypes.BIGINT,
    payment_method: DataTypes.STRING,
    payment_status_id: DataTypes.BIGINT,
    order_status_id: DataTypes.BIGINT,
    total_price: DataTypes.NUMBER,
    order_item: DataTypes.JSON,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
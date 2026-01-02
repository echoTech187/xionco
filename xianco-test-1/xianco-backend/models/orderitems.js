'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderItems.belongsTo(models.Order, {
        foreignKey: 'order_id',
        as: 'order'
      })

      OrderItems.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product'
      })

    }
  }
  OrderItems.init({
    order_id: DataTypes.BIGINT,
    product_id: DataTypes.BIGINT,
    product: DataTypes.JSON,
    quantity: DataTypes.NUMBER,
    price: DataTypes.NUMBER,
    amount: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'OrderItems',
  });
  return OrderItems;
};
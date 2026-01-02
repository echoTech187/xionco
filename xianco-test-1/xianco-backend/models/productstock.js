'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductStock extends Model {
    static associate(models) {
      ProductStock.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product'
      })
    }
  }
  ProductStock.init({
    product_id: DataTypes.BIGINT,
    current_stock: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'ProductStock',
  });
  return ProductStock;
};
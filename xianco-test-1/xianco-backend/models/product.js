'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.ProductStock, {
        foreignKey: 'product_id',
        as: 'product_stocks'
      })

      Product.hasMany(models.OrderItem, {
        foreignKey: 'product_id',
        as: 'product'
      })
    }

  }
  Product.init({
    name: DataTypes.STRING,
    sku: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    price: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
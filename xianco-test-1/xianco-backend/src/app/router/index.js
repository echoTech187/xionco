const express = require('express');
const AuthenticationController = require('../controllers/auth');
const ProductController = require('../controllers/product');
const StockController = require('../controllers/stock');
const OrderController = require('../controllers/order');
const CustomerController = require('../controllers/customer');
const PaymentMethodController = require('../controllers/paymentMethod');
const PaymentStatusController = require('../controllers/paymentStatus');
const OrderStatusController = require('../controllers/orderStatus');

const router = express.Router();

// Start Router Authentication
router.post('/auth', AuthenticationController.login);
router.get('/profile', AuthenticationController.profile);
// End Router Authentication

// Start Router Product
router.get('/products', ProductController.index);
router.get('/product/:id', ProductController.show);
router.post('/product', ProductController.store);
router.put('/product/:id', ProductController.update);
router.delete('/product/:id', ProductController.destroy);
// End Router Product

// Start Router Stock
router.get('/stocks', StockController.index);
router.get('/stock/:id', StockController.show);
router.post('/stock', StockController.store);

// End Router Stock

// Start Router Order
router.get('/orders', OrderController.index);
router.get('/order/:id', OrderController.show);
router.post('/order', OrderController.store);
router.put('/order/:id', OrderController.update);
router.delete('/order/:id', OrderController.destroy);
// End Router Order


//Start Utilities Router
router.get('/customers', CustomerController.index);
router.get('/payment-methods', PaymentMethodController.index);
router.get('/payment-statuses', PaymentStatusController.index);
router.get('/order-statuses', OrderStatusController.index);
//End Utilities Router

module.exports = router;
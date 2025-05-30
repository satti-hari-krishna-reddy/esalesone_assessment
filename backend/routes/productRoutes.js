const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // double check this path!

router.get('/v1/products', productController.getProducts);
router.get('/v1/products/:id', productController.getProductById);
router.post('/v1/checkout', require('../controllers/orderController').handleCheckout);

module.exports = router;

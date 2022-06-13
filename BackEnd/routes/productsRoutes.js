'use strict';

const express = require('express');
const productControll = require('../controllers/productController');
const router = express.Router();

router.get('/products', productControll.getAllProducts);
router.get('/products/:id', productControll.getProductById);
router.get('/products/filter/:codeBar', productControll.getProductByFilter);
router.post('/products', productControll.addProduct);
router.put('/products/:id', productControll.updateProduct);
router.delete('/products/:id', productControll.deleteProduct);

module.exports = {
    routes: router
}
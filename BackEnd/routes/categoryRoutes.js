'use strict';

const express = require('express');
const categoryControll = require('../controllers/categoryController');
const router = express.Router();

router.get('/category', categoryControll.getCategories);
router.get('/category/:id', categoryControll.getCategoryById);

/*
router.get('/category/:id', categoryControll.getProductById);
router.post('/category', categoryControll.addProduct);
router.put('/category/:id', categoryControll.updateProduct);
router.delete('/category/:id', categoryControll.deleteProduct);
*/




module.exports = {
    routes: router
}
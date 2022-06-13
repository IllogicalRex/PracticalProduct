'use strict';

const express = require('express');
const detailControll = require('../controllers/productDetailController');
const router = express.Router();

router.get('/detail/:id', detailControll.getDetailById);
router.delete('/detail/:id', detailControll.deleteDetailById);
router.post('/detail/', detailControll.addDetail);
router.post('/detail/details', detailControll.addDetails);
router.put('/detail/:id', detailControll.updateDetail);
//router.get('/detail/:id', detailControll.getCategoryById);

/*
router.get('/category/:id', categoryControll.getProductById);
router.post('/category', categoryControll.addProduct);
router.put('/category/:id', categoryControll.updateProduct);
router.delete('/category/:id', categoryControll.deleteProduct);
*/




module.exports = {
    routes: router
}
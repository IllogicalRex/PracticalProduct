'use strict';

const productData = require('../data/products');

const getAllProducts = async (req, res, next) => {
    try {

        const productlist = await productData.getProducts();
        res.send(productlist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getProductById = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await productData.getProductById(productId);
        res.send(product[0]);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getProductByFilter = async (req, res, next) => {
    try {
        const codeBar = req.params.codeBar;
        const product = await productData.getProductByFilters(codeBar);
        res.send(product[0]);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addProduct = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await productData.creatProduct(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const productId =  req.params.id;
        const data = req.body;
        const updated = await productData.updateProduct(productId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await productData.deleteProduct(productId);
        res.send(deletedProduct);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductByFilter
}
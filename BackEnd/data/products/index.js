'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getProducts = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const productList = await pool.request().query(sqlQueries.getProducts);
        return productList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getProductById = async (id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const product = await pool.request()
                            .input('Id', sql.Int, id)
                            .query(sqlQueries.getProductById); 
        return product.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getProductByFilters = async (codeBar) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const product = await pool.request()
                            .input('CodeBar', sql.Char(8), codeBar)
                            .query(sqlQueries.getProductByFilter); 
        return product.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const creatProduct = async (productData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const insertProduct = await pool.request()
                            .input('CodeBar', sql.Char(8), productData.CodeBar)
                            .input('Name', sql.VarChar(100), productData.Name)
                            .input('Category', sql.Int, productData.Category)
                            .input('Brand', sql.VarChar(100), productData.Brand)
                            .query(sqlQueries.createProduct); 
        return insertProduct.recordset[0];
    } catch (error) {
        return error.message;
    }
}

const updateProduct = async (Id, data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const update = await pool.request()
                        .input('Id', sql.Int, Id)
                        .input('Name', sql.VarChar(100), data.Name)
                        .input('Category', sql.Int, data.Category)
                        .input('Status', sql.Int, data.Status)
                        .input('Brand', sql.VarChar(100), data.Brand)
                        .query(sqlQueries.updateProduct);
        return update.recordset[0];
    } catch (error) {
        return error.message;
    }
}

const deleteProduct = async (productId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const deleteProduct = await pool.request()
                            .input('Id', sql.Int, productId)
                            .query(sqlQueries.deleteProduct);
        return deleteProduct.recordset[0];
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getProducts,
    getProductById,
    creatProduct,
    updateProduct,
    deleteProduct,
    getProductByFilters
}
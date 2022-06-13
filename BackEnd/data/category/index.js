'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getCategories = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('category');
        const categoryList = await pool.request().query(sqlQueries.getCategories);
        return categoryList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getCategoryById = async (id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('category');
        const category = await pool.request()
                            .input('Id', sql.Int, id)
                            .query(sqlQueries.getCategoryById); 
        return category.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getCategories,
    getCategoryById
}
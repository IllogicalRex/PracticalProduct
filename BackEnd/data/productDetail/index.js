'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');


const getDetailById = async (id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('productDetail');
        const detail = await pool.request()
                            .input('ProductId', sql.Int, id)
                            .query(sqlQueries.getDetailByProductId); 
        return detail.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const deleteDetailById = async (id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('productDetail');
        const detail = await pool.request()
                            .input('Id', sql.Int, id)
                            .query(sqlQueries.deleteDetail); 
        return detail.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const addDetail = async (characteristicData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('productDetail');
        const insertCharacteristic = await pool.request()
                            .input('ProductId', sql.Int, characteristicData.ProductId)
                            .input('CharacteristicName', sql.VarChar(50), characteristicData.CharacteristicName)
                            .input('Description', sql.VarChar(200), characteristicData.Description)
                            .query(sqlQueries.postCharacteristic); 
        return insertCharacteristic.recordset[0];
    } catch (error) {
        return error.message;
    }
}

const addDetails = async (characteristicData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('productDetail');
        const insertCharacteristic = null;
        characteristicData.forEach(async elem => {
            insertCharacteristic = await pool.request()
                            .input('ProductId', sql.Int, elem.ProductId)
                            .input('CharacteristicName', sql.VarChar(50), elem.CharacteristicName)
                            .input('Description', sql.VarChar(200), elem.Description)
                            .query(sqlQueries.postCharacteristic); 
            
        });
        // return insertCharacteristic.recordset[0];
        return characteristicData;
    } catch (error) {
        return error.message;
    }
}

const updateDetail = async (Id, characteristicData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('productDetail');
        const update = await pool.request()
                        .input('Id', sql.Int, Id)
                        .input('CharacteristicName', sql.VarChar(50), characteristicData.CharacteristicName)
                        .input('Description', sql.VarChar(200), characteristicData.Description)
                        .query(sqlQueries.putDetail);
        return update.recordset[0];
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getDetailById,
    deleteDetailById,
    addDetail,
    addDetails,
    updateDetail
}
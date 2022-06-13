'use strict';

const categoryData = require('../data/productDetail');

const getDetailById = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const detailList = await categoryData.getDetailById(productId);
        if(detailList === undefined || detailList === null ) {
            detailList = [];
        }
        res.send(detailList);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteDetailById = async (req, res, next) => {
    try {
        const Id = req.params.id;
        const detail = await categoryData.deleteDetailById(Id);
        if(detail === undefined || detail === null ) {
            detail = [];
        }
        res.send(detail[0]);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addDetail = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await categoryData.addDetail(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addDetails = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await categoryData.addDetails(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateDetail = async (req, res, next) => {
    try {
        const Id =  req.params.id;
        const data = req.body;
        const insert = await categoryData.updateDetail(Id,data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getDetailById,
    deleteDetailById,
    addDetail,
    addDetails,
    updateDetail
}
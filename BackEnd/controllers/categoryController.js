'use strict';

const categoryData = require('../data/category');

const getCategories = async (req, res, next) => {
    try {

        const categorylist = await categoryData.getCategories();
        res.send(categorylist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getCategoryById = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const category = await categoryData.getCategoryById(categoryId);
        res.send(category[0]);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getCategories,
    getCategoryById
}
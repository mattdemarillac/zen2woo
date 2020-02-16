 //Require Mongoose
const productsAttributesModelSchema = require('../schema/productsAttributes');
const mongoose = require('mongoose');

const ProductsAttributesModel = mongoose.model('productsAttributes', productsAttributesModelSchema);

module.exports = ProductsAttributesModel;

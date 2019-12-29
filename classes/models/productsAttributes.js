 //Require Mongoose
const productsAttributesModelSchema = require('../schema/productsAttributes');
const mongoose = require('mongoose');

const ProductsAttributesModel = mongoose.model('productsAttribuutes', productsAttributesModelSchema);

module.exports = ProductsAttributesModel;

const mongoose = require('mongoose')

// Define a schema
const Schema = mongoose.Schema

const ProductsSchema = new Schema({
  'products_id': Number,
  'products_price': String,
  'products_quantity': Number,
  'products_image': String,
  'description': Array
})

module.exports = ProductsSchema

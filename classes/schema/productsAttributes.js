const mongoose = require('mongoose')

// Define a schema
const Schema = mongoose.Schema

const ProductsAttribtesSchema = new Schema({
  options_values_id: String,
  options_values_price: String,
  price_prefix: String,
  products_attributes_weight: String,
  attributes_discounted: String,
  attributes_qty_prices: String,
  stock: Array
})

module.exports = ProductsAttribtesSchema

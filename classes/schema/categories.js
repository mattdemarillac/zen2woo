const mongoose = require('mongoose')

// Define a schema
const Schema = mongoose.Schema

const CategoriesSchema = new Schema({
  'id': Number,
  'parent': Number,
  'menu_order': Number,
  'name': String,
  'description': String,
  'display': String
})

module.exports = CategoriesSchema

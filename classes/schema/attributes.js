const mongoose = require('mongoose')

// Define a schema
const Schema = mongoose.Schema

const TermsSchema = new Schema({
  'id': Number,
  'name': String,
  'slug': String
})

const AttributesSchema = new Schema({
  'id': Number,
  'name': String,
  'slug': String,
  'type': String,
  'order_by': String,
  'has_archives': Boolean,
  'terms': Array(TermsSchema)
})

module.exports = AttributesSchema

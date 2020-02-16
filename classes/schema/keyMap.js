const mongoose = require('mongoose')

// Define a schema
const Schema = mongoose.Schema

const KeyMapSchema = new Schema({
  'type': String,
  'old_id': Number,
  'new_id': Number
})

module.exports = KeyMapSchema

const db = require('../database');

const database = new db().connect();

//Define a schema
const Schema = database.Schema;

const ProductsAttribtesSchema = new Schema({
  'data': String
});

module.exports = ProductsAttribtesSchema;

var express = require('express');
var router = express.Router();
// const database = require('../classes/database.js');
const importer = require('../classes/import.js');
const CategoriesModel = require('../classes/models/categories');
const ProductsModel = require('../classes/models/products');
const ProductsAttributesModel = require('../classes/models/productsAttributes');
const AttributesModel = require('../classes/models/attributes');

/* GET /import page. */
router.get('/', async (req, res, next) => {
  //immutable response data.
  const products = [];
  const categories = [];
  const attributes = [];
  const productsAttributes = [];

  await importer.getProducts().then(async data =>{
      Object.assign(products, data);
      ProductsModel.create(...products);
  });
  await importer.getProductsAttributes().then(async data =>{
    Object.assign(productsAttributes, data);
    ProductsAttributesModel.create({
      data: productsAttributes
    });
  });
  await importer.getCategories().then(async data =>{
    Object.assign(categories, data);
    CategoriesModel.create(...categories);
  });
  await importer.getAttributes().then(async data =>{
    Object.assign(attributes, data);
    AttributesModel.create(...attributes);
  });

  res.send([{
    'categories': categories,
    'products': products,
    'attributes': attributes,
    'productsAttributes': productsAttributes
  }])
});

module.exports = router;

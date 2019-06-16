var express = require('express');
var router = express.Router();
// const database = require('../classes/database.js');
const importer = require('../classes/import.js');
const CategoriesModel = require('../classes/models/categories');
const ProductsModel = require('../classes/models/products');

/* GET /import page. */
router.get('/', async (req, res, next) => {
  //immutable response data.
  const products = [];
  const categories = [];

  await importer.getProducts().then(async (data)=>{
      Object.assign(products, data);
      ProductsModel.create(...products);
  });
  await importer.getCategories().then(async (data)=>{
    Object.assign(categories, data);
    CategoriesModel.create(...categories);
  });

  res.send([{
    'categories': categories,
    'products': products
  }])
});

module.exports = router;

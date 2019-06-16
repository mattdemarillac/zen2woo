var express = require('express');
var router = express.Router();
const CategoriesModel = require('../classes/models/categories');
const ProductsModel = require('../classes/models/products');

/* GET /list listings. */
router.get('/', async (req, res, next) => {
    let categories = [],
      products = [];

    await CategoriesModel.find({}, (err, docs) => {
      categories = docs
    });

    await ProductsModel.find({}, (err, docs) => {
      products = docs
    });

    res.send({
      'categories': categories,
      'products': products
    })
});

module.exports = router;

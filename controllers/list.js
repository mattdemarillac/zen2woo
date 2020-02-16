const express = require('express')
const router = express.Router()
const CategoriesModel = require('../classes/models/categories')
const ProductsModel = require('../classes/models/products')
const AttributesModel = require('../classes/models/attributes')
const ProductsAttributesModel = require('../classes/models/productsAttributes')

/* GET /list listings. */
router.get('/', async (req, res, next) => {
  const categories = []
  const products = []
  const attributes = []
  const productsAttributes = []

  await CategoriesModel.find({}, (err, docs) => {
    categories.push(...docs)
  })

  await ProductsModel.find({}, (err, docs) => {
    products.push(docs)
  })

  await AttributesModel.find({}, (err, docs) => {
    attributes.push(docs)
  })

  await ProductsAttributesModel.find({}, (err, docs) => {
    productsAttributes.push(docs)
  })

  res.json.send({
    'categories': categories,
    'products': products,
    'attributes': attributes,
    'productsAttributes': productsAttributes
  })

  next()
})

module.exports = router

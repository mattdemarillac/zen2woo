const express = require('express')
const router = express.Router()
const async = require('async')
const logger = require('morgan')

const importer = require('../classes/api/oobAPI.js')
const CategoriesModel = require('../classes/models/categories')
const ProductsModel = require('../classes/models/products')
const ProductsAttributesModel = require('../classes/models/productsAttributes')
const AttributesModel = require('../classes/models/attributes')

/* GET /import page. */
router.get('/', async (req, res, next) => {
  // immutable response data.
  const products = []
  const categories = []
  const attributes = []
  const productsAttributes = []

  await async.waterfall([
    async (callback) => {
      await CategoriesModel.deleteMany({})
      await ProductsModel.deleteMany({})
      await ProductsAttributesModel.deleteMany({})
      await AttributesModel.deleteMany({})
      callback(null)
    },
    async (callback) => {
      await importer.getProducts().then(async data => {
        Object.assign(products, data)
        ProductsModel.create(...products)
        console.log(`${products.length} Products imported.`)
        logger(JSON.stringify(...products))
      })
      callback(null)
    },
    async (callback) => {
      await importer.getProductsAttributes().then(async data => {
        Object.assign(productsAttributes, data)
        ProductsAttributesModel.create(...productsAttributes)
        console.log(`${productsAttributes.length} Product Attributes imported.`)
        logger(JSON.stringify(...productsAttributes))
      })
      callback(null)
    },
    async (callback) => {
      await importer.getAttributes().then(async data => {
        Object.assign(attributes, data)
        AttributesModel.create(...attributes)
        console.log(`${attributes.length} Global Attributes imported.`)
        logger(JSON.stringify(...attributes))
      })
      callback(null)
    },
    async (callback) => {
      await importer.getCategories().then(async data => {
        Object.assign(categories, data)
        CategoriesModel.create(...categories)
        console.log(`${categories.length} Categories imported.`)
        logger(JSON.stringify(...categories))
      })
      callback(null)
    }
  ])

  res.json({
    'imported_count': {
      'categories': categories.length,
      'products': products.length,
      'attributes': attributes.length,
      'productsAttributes': productsAttributes.length
    }
  })

  next()
})

module.exports = router

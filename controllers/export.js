var express = require('express')
var router = express.Router()
const async = require('async')

const Terms = require('../classes/migrate/terms')
const Categories = require('../classes/migrate/categories')
const Attributes = require('../classes/migrate/attributes')

const keyMapModel = require('../classes/models/keyMap')

router.get('/', async (req, res, next) => {
  const categoriesMigrate = new Categories()
  const attributesMigrate = new Attributes()
  const termsMigrate = new Terms()

  const data = {
    categoriesData: Array,
    attributesData: Array,
    termsData: Array
  }

  await async.waterfall([
    async (callback) => {
      await keyMapModel.deleteMany({})
      callback(null)
    },
    async (callback) => {
      data.attributesData = await attributesMigrate.execute()
      console.log(`attributesMigrate complete.`)
      callback(null)
    },
    async (callback) => {
      data.categoriesData = await categoriesMigrate.execute()
      console.log(`categoriesMigrate complete.`)
      callback(null)
    },
    async (callback) => {
      data.termsData = await termsMigrate.execute()
      console.log(`termsMigrate complete.`)
      callback(null)
    }
  ])

  res.send({
    categories: data.categoriesData,
    attributes: data.attributesData,
    terms: data.termsData
  })

  next()
})

module.exports = router

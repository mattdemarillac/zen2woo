var express = require('express');
var router = express.Router();
const categories = require('../classes/migrate/categories')
const attributes = require('../classes/migrate/attributes')
const terms = require('../classes/migrate/terms')

router.get('/', async (req, res, next) => {
  const categoriesMigrate = new categories()
  const attributesMigrate = new attributes()
  const termsMigrate = new terms()

  // await categoriesMigrate.execute()
  const attributesData = await attributesMigrate.execute()
  const termsData = await termsMigrate.execute()
  res.send({
    attributes: attributesData,
    terms: termsData
  })
})

module.exports = router;

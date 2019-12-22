var express = require('express');
var router = express.Router();
const categories = require('../classes/migrate/categories')
const attributes = require('../classes/migrate/attributes')

router.get('/', async (req, res, next) => {
  const categoriesMigrate = new categories()
  const attributesMigrate = new attributes()

  // await categoriesMigrate.execute()
  const attributesData = await attributesMigrate.execute()
  res.send({
    attributes: attributesData
  })
});

module.exports = router;

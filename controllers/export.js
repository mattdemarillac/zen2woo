var express = require('express');
var router = express.Router();
const categories = require('../classes/migrate/categories')

router.get('/', async (req, res, next) => {
  const categoriesMigrate = new categories()
  await categoriesMigrate.execute()
  res.sendStatus(200)
});

module.exports = router;

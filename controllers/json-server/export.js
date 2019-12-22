const categories = require('../../classes/migrate/categories')
const attributes = require('../../classes/migrate/attributes')

module.exports = async (req, res, next) => {
  const categoriesMigrate = new categories()
  const attributesMigrate = new attributes()

  // await categoriesMigrate.execute()
  const attributesData = await attributesMigrate.execute()
  res.body = ({
    attributes: attributesData
  })
}

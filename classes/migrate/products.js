var async = require('async')
const ProductsModel = require('../models/products')
const keyMapModel = require('../models/keyMap')
const functions = require('../functions')

class ProductsMigrate {
  async execute () {
    return await async.waterfall([
      async function findProducts (callback) {
        const products = await ProductsModel.find({}, null, { lean: true }).select('-terms')
        callback(null, products)
      },
      async (products, callback) => {
        const newItems = await functions.postAsyncHelper('products/batch', { 'create': [...products] })

        const keys = newItems.create.map(item => {
          const old = products.filter(oldItem => {
            return oldItem.name === item.name
          })
          return { 'type': 'product', 'old_id': old.length > 0 ? old[0].id : old.id, 'new_id': item.id }
        })

        callback(null, keys)
      },
      async (keys, callback) => {
        await keyMapModel.create(...keys)
        callback(null)
      }
    ])
  }
}

module.exports = ProductsMigrate

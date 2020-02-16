var async = require('async')

const AttributesModel = require('../models/attributes')
const keyMapModel = require('../models/keyMap')
const functions = require('../functions')

class AttributesMigrate {
  async execute () {
    await async.waterfall([
      async (callback) => {
        const attributes = await AttributesModel.find({}, null, { lean: true }).select({})
        callback(null, attributes)
      },
      async (attributes, callback) => {
        const formatted = await attributes.map(item => {
          return {
            name: item.name,
            slug: item.slug,
            type: item.type,
            order_by: item.order_by,
            has_archives: item.has_archives
          }
        })
        callback(null, attributes, formatted)
      },
      async (oldItems, formatted, callback) => {
        const newItems = await functions.postAsyncHelper('products/attributes/batch', { 'create': [...formatted] })

        callback(null, newItems, oldItems)
      },
      async (newItems, oldItems, callback) => {
        const keys = await newItems.create.map(newItem => {
          const oldItem = oldItems.filter(item => {
            return unescape(`pa_${item.slug}`) === newItem.slug
          })
          return { 'type': 'attribute', 'old_id': oldItem.length > 0 ? oldItem[0].id : oldItem.id, 'new_id': newItem.id }
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

module.exports = AttributesMigrate

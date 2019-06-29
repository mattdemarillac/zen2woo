var async = require("async");
const AttributesModel = require('../models/attributes')
const database = require('../database.js')
const woocommerce = require('../woocommerce');

class AttributesMigrate {

  async execute() {
    const list = new database();
    await list.connect();

    const post = async (item) => {
      return await woocommerce.postAsync('products/attributes/batch', item).then(result => {
        return JSON.parse(result.toJSON().body)
      }).error(error => {
        console.error(error)
      }).then(json => {
        return json
      })
    }

    return await async.waterfall([
      async function findCategories(callback) {
        const attributes = await AttributesModel.find({}, null, {lean: true}).select('-terms')
        callback(null, attributes)
      },
      async (items, callback) => {
        const formatted = items.map(item => {
          return {
            name: item.name,
            slug: item.slug,
            type: item.type,
            order_by: item.order_by,
            has_archives: item.has_archives
          }
        });
        callback(null, items, formatted)
      },
      async (items, formatted, callback) => {
        const newItems = await post({'create': [...formatted]})

        const keys = newItems.create.map(item => {
          const old = items.filter(oldItem => {
            return oldItem.name === item.name
          });
          return {'old_id': old.length > 0 ? old[0].id : old.id, 'new_id': item.id}
        });

        callback(null, keys)
      },
      async (keys, callback) => {
        await attrKeyMapModel.deleteMany({})
        await attrKeyMapModel.create(...keys)
        callback(null)
      }
    ])
  }
}

module.exports = AttributesMigrate

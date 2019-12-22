var async = require("async");
const _chunk = require('lodash/chunk');
const _flatten = require('lodash/flatten');

const AttributesModel = require('../models/attributes')
const keyMapModel = require('../models/keyMap');
const database = require('../../data/mongo/database.js')
const woocommerce = require('../woocommerce');

class AttributesMigrate {

  async execute() {
    this.data = {
      attributes: [],
      newTerms: []
    };

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

    // const postTerms = async (item, attribute_id) => {
    //   return await woocommerce.postAsync('products/attributes/' + attribute_id + '/terms/batch', item).then(result => {
    //     return JSON.parse(result.toJSON().body)
    //   }).error(error => {
    //     console.error(error)
    //   }).then(json => {
    //     return json
    //   })
    // }

    await async.waterfall([
      async (callback) => {
        const attributes = await AttributesModel.find({}, null, {lean: true}).select({})
        this.data.attributes = attributes
        callback(null, attributes)
      },
      async (items, callback) => {
        const formatted = items.map(item => {
          return {
            name: item.name,
            slug: item.slug,
            type: item.type,
            order_by: item.order_by,
            has_archives: item.has_archives,
          }
        });
        callback(null, items, formatted)
      },
      async (items, formatted, callback) => {
        await keyMapModel[2].deleteMany({})

        const newItems = await post({'create': [...formatted]})

        this.data.newTerms = newItems

        const keys = newItems.create.map(item => {
          const old = items.filter(oldItem => {
            return oldItem.name === item.name
          });
          return {'old_id': old.length > 0 ? old[0].id : old.id, 'new_id': item.id}
        });

        callback(null, keys)
      },
      async (keys, callback) => {
        await keyMapModel[1].deleteMany({})
        await keyMapModel[1].create(...keys)
        callback(null)
      }
    ])

    return this.getData();
  }

  getData() {
    return this.data
  }
}

module.exports = AttributesMigrate

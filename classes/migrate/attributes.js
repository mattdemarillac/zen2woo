var async = require("async");
const _chunk = require('lodash/chunk');
const _flatten = require('lodash/flatten');

const AttributesModel = require('../models/attributes')
const keyMapModel = require('../models/keyMap');
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

    const postTerms = async (item, attribute_id) => {
      return await woocommerce.postAsync('products/attributes/' + attribute_id + '/terms/batch', item).then(result => {
        return JSON.parse(result.toJSON().body)
      }).error(error => {
        console.error(error)
      }).then(json => {
        return json
      })
    }

    return await async.waterfall([
      async function findAttributes(callback) {
        const attributes = await AttributesModel.find({}, null, {lean: true}).select({})
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
        let newTerms = [];

        await newItems.create.map(async (item, index) => {
          const formattedTerms = items[index].terms.map(term => {
            return {
              id: term.id,
              name: term.name,
              slug: term.slug
            };
          });

          let chunks = _chunk(formattedTerms, 99);

          chunks = await chunks.map(async (piece) => {
            return await postTerms({'create': [...piece]}, item.id);
          });

          newTerms = _flatten(chunks);

          const termKeys = newTerms.create.map(item => {
            const old = formattedTerms.filter(oldItem => {
              return oldItem.name === item.name
            });
            return {'old_id': old.length > 0 ? old[0].id : old.id, 'new_id': item.id}
          });

          await keyMapModel.create(...keys)

        });

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
  }
}

module.exports = AttributesMigrate

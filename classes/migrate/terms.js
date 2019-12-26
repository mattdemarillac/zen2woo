var async = require("async");
const _chunk = require('lodash/chunk');
const _flatten = require('lodash/flatten');
const _filter = require('lodash/filter')

const AttributesModel = require('../models/attributes')
const keyMapModel = require('../models/keyMap');
const database = require('../database.js')
const woocommerce = require('../woocommerce');

class TermsMigrate {

  async execute() {
    this.data = {
      attributes: [],
      newTerms: []
    };

    const list = new database();
    await list.connect();

    const postTerms = async (item, attribute_id) => {
      return await woocommerce.postAsync('products/attributes/' + attribute_id + '/terms/batch', item).then(result => {
        return JSON.parse(result.toJSON().body)
      }).error(error => {
        console.error(error)
      }).then(json => {
        return json
      })
    }

    await async.waterfall([
      async (callback) => {
        const attributes = await AttributesModel.find({}, null, {lean: true}).select('id terms -_id')
        const keys = await keyMapModel[1].find({}, null, {lean: true}).select({})

        const terms = attributes.map((attribute) => {
          const newId = _filter(keys, (key) => {
            return key.old_id === attribute.id
          })

          return Object.assign({}, attribute, {new_id: newId[0].new_id})
        })

        this.data.attributes = attributes
        this.data.newTerms = terms
        // console.log(attributes)
        callback(null, terms)
      },
      async (newTerms, callback) => {

        async.forEach(newTerms, async (term) => {
          const termsFormatted = term.terms.map((term) => {
            return {
              name: term.name
            }
          })

          const chunks = _chunk(termsFormatted, 99)
          await async.forEach(chunks, async (chunk) => {
            await postTerms({'create': [...chunk]}, term.new_id)
          })

        })

        callback(null)
      }
    ])

    return this.getData();
  }

  getData() {
    return this.data
  }
}

module.exports = TermsMigrate

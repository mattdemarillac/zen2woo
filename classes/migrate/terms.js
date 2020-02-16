const AttributesModel = require('../models/attributes')
const keyMapModel = require('../models/keyMap')
const functions = require('../functions')
const async = require('async')
const _chunk = require('lodash/chunk')
const _filter = require('lodash/filter')

class TermsMigrate {
  async execute () {
    await async.waterfall([
      async (callback) => {
        const attributes = await AttributesModel.find({}, null, { lean: true }).select('id terms -_id')
        const keys = await keyMapModel.find({ 'type': 'attribute' }, null, { lean: true }).select({})

        const terms = attributes.map((attribute) => {
          const newId = _filter(keys, (key) => {
            return key.old_id === attribute.id
          })[0]

          return Object.assign({}, attribute, { new_id: newId.new_id })
        })

        callback(null, terms)
      },
      async (newTerms, callback) => {
        await async.forEach(newTerms, async (term) => {
          const termsFormatted = term.terms.map((term) => {
            return {
              name: term.name
            }
          })

          const chunks = _chunk(termsFormatted, 99)
          await async.forEach(chunks, async (chunk) => {
            await functions.postAsyncHelper(
              `products/attributes/${term.new_id}/terms/batch`,
              { 'create': [...chunk] })
          })
        })
        callback(null, newTerms)
      },
      async (newTerms, callback) => {
        const keyMap = newTerms.map((term) => {
          return {
            'type': 'term',
            'old_id': term.id,
            'new_id': term.new_id
          }
        })

        await keyMapModel.create(...keyMap)
        callback(null)
      }
    ])
  }
}

module.exports = TermsMigrate

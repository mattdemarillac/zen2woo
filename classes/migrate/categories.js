const async = require('async')
const CategoriesModel = require('../models/categories')
const keyMapModel = require('../models/keyMap')
const functions = require('../functions')

class CategoriesMigrate {
  async execute () {
    await async.waterfall([
      async (callback) => {
        const categories = await CategoriesModel.find({ 'parent': 0 }, null, { lean: true })
        callback(null, categories)
      },
      async (categories, callback) => {
        const formatted = await categories.map(item => {
          return {
            'parent': item['parent'],
            'menu_order': item['menu_order'],
            'name': item['name'],
            'description': item['description'],
            'display': item['display']
          }
        })
        callback(null, formatted, categories)
      },
      async (items, oldCategories, callback) => {
        const newItems = await functions.postAsyncHelper('products/categories/batch', { 'create': [...items] })

        callback(null, newItems, oldCategories)
      },
      async (newItems, oldItems, callback) => {
        const keys = newItems.create.map(item => {
          if (item.slug === undefined) {
            console.error('New Category is undefined.')
          }
          const old = oldItems.filter(oldItem => {

            const oldSlug = functions.slugify(oldItem.name.replace(/&/gm, ''))
            const newItem = functions.slugify(item.slug)

            return oldSlug === newItem
          })
          if (!old) {
            console.error('Category slugs match not found.')
          }
          return { 'type': 'category', 'old_id': old.length > 0 ? old[0].id : old.id, 'new_id': item.id }
        })
        callback(null, keys)
      },
      async (keys, callback) => {
        await keyMapModel.create(...keys)
        callback(null, keys)
      },
      async (keys, callback) => {
        const subCategories = await CategoriesModel.find({ 'parent': { $gt: 0 } }, null, { lean: true })
        return callback(null, keys, subCategories)
      },
      async (keys, subCategories, callback) => {
        const newSubCategories = subCategories.map(category => {
          const match = keys.filter(key => {
            return key.old_id === category.parent
          }).pop()
          return {
            'parent': match.new_id,
            'menu_order': category['menu_order'],
            'name': category['name'],
            'description': category['description'],
            'display': category['display']
          }
        })
        callback(null, newSubCategories)
      },
      async (newSubCategories, callback) => {
        await functions.postAsyncHelper('products/categories/batch', { 'create': [...newSubCategories] })
        callback(null)
      }
    ])
  }
}

module.exports = CategoriesMigrate

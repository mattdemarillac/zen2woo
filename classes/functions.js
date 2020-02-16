const woocommerce = require('./api/wooCommerceAPI')

const slugify = (stringLiteral) => {
  let str = stringLiteral.replace(/^\s+|\s+$/g, '') // trim
  str = str.toLowerCase()

  // remove accents, swap ñ for n, etc
  let from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;'
  let to = 'aaaaeeeeiiiioooouuuunc------'

  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  str = str.replace('.', '-') // replace a dot by a dash
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by a dash
    .replace(/-+/g, '-') // collapse dashes

  return str
}

const swapOldNewKeys = async (newItems, oldItems, type) => {
  return await newItems.create.map(newItem => {
    const oldItem = oldItems.filter(oldItem => {
      return oldItem.name === newItem.name
    })[0]
    return { 'type': type, 'old_id': oldItem.id, 'new_id': newItem.id }
  })
}

const postAsyncHelper = async (endpoint, itemCollection) => {
  const post = async (itemCollection) => {
    return await woocommerce.postAsync(endpoint, itemCollection).then(result => {
      return JSON.parse(result.toJSON().body)
    }).error(error => {
      console.error(error)
      return []
    }).then(json => {
      return json
    })
  }

  const res = await post(itemCollection)
  console.log(`Endpoint: ${endpoint} completed.`)
  return res
}


module.exports = {
  'slugify': slugify,
  'swapOldNewKeys': swapOldNewKeys,
  'postAsyncHelper': postAsyncHelper
}

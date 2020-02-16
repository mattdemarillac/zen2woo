const Woocommerce = require('woocommerce-api')

const wooAPI = new Woocommerce({
  url: 'http://oob2.lndo.site/',
  consumerKey: 'ck_694fa554fee1c83a48dab15bf6218c5d2fb960f2',
  consumerSecret: 'cs_72b5e080b2cf452e0ab8fd6611808eb83ae9afa8',
  wpAPI: true,
  version: 'wc/v1'
})

module.exports = wooAPI

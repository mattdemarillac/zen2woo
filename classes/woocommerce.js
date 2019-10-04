const WooCommerceAPI = require('woocommerce-api');

const WooCommerce = new WooCommerceAPI({
    url: 'http://outofbody.com.au',
    // consumerKey: 'ck_60017866a63870f3e89a7b318651ca622b984adf',
    // consumerSecret: 'cs_de2099516666b1a14dc9bb5062f5b50115fb4e1f'
  consumerKey: 'ck_2883fc26dbd25bd255c492a3f882a2ed64689daf',
  consumerSecret: 'cs_82b5cff9a86d0e833490289b2dde8cb0fdcfd3fd',
  wpAPI: true,
  version: 'wc/v1'
});

module.exports = WooCommerce;

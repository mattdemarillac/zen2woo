const WooCommerceAPI = require('woocommerce-api');

const WooCommerce = new WooCommerceAPI({
    url: 'https://outofbody.com.au',
    consumerKey: 'ck_06a8fc29eb56d18e466af7b25b116bbdfc1204b5',
    consumerSecret: 'cs_b0bc45f7d4f9375e67e68dcfbeb3c347570a3b3a',
    verifySsl: false,
    port: 443
});

module.exports = WooCommerce;

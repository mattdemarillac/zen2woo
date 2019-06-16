const WooCommerceAPI = require('woocommerce-api');

const WooCommerce = new WooCommerceAPI({
    url: 'https://outofbody.com.au',
    consumerKey: 'ck_bb6d360d2b67d670a98990ce0312da6b4e2ff457',
    consumerSecret: 'cs_49848dedf9100622154047edfca9b428e01a0fbe',
    wpAPI: true,
    version: 'wc/v3'
});

module.exports = WooCommerce;

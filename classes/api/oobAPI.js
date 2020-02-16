const axios = require('axios')
require('dotenv').config()
/**
 * Retrieves json data from oob api.
 */
class Importer {
  /**
     * Gets a list of products from api and returns result on promise satisfied.
     * @returns {Promise<AxiosResponse<any>>}
     */
  static async getProducts () {
    async function _requestProducts () {
      return axios({
        'method': 'post',
        'url': 'https://outofbodypiercings.com/wpoob/index.php',
        'data': {
          'token': process.env.OOBTOKEN,
          'products': true
        }
      })
    }
    return await _requestProducts().then((data) => {
      return data.data
    })
  }

  /**
   * Gets a list of products attributes and stock from api and returns result on promise satisfied.
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async getProductsAttributes () {
    async function _requestProductsAttributes () {
      return await axios.post(
        'https://outofbodypiercings.com/wpoob/index.php',
        {
          'token': process.env.OOBTOKEN,
          'products_attributes': true
        })
    }

    return await _requestProductsAttributes().then((data) => {
      return data.data
    })
  }

  /**
     * Gets a list of products from api and returns result on promise satisfied.
     * @returns {Promise<AxiosResponse<any>>}
     */
  static async getCategories () {
    async function _requestCategories () {
      return await axios.post(
        'https://outofbodypiercings.com/wpoob/index.php',
        {
          'token': process.env.OOBTOKEN,
          'categories': true
        })
    }

    return await _requestCategories().then((data) => {
      return data.data
    })
  }

  /**
   * Gets a list of products from api and returns result on promise satisfied.
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async getAttributes () {
    async function _requestAttributes () {
      return await axios.post(
        'https://outofbodypiercings.com/wpoob/index.php',
        {
          'token': process.env.OOBTOKEN,
          'attributes': true
        })
    }

    return await _requestAttributes().then((data) => {
      return data.data
    })
  }
}

module.exports = Importer

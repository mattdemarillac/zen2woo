const axios = require('axios')

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
      return await axios.get('https://outofbodypiercings.com/wpoob/?products')
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
      return await axios.get('https://outofbodypiercings.com/wpoob/?products_attributes')
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
      return await axios.get('https://outofbodypiercings.com/wpoob/?categories')
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
      return await axios.get('https://outofbodypiercings.com/wpoob/?attributes')
    }

    return await _requestAttributes().then((data) => {
      return data.data
    })
  }
}

module.exports = Importer

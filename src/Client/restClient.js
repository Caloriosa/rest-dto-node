const NodeRestClientPromise = require('node-rest-client-promise');
const ClientApiError = require("./clientApiError.js");

/**
 * @class
 */
class RestClient  {
  /**
   * 
   * @param {string} url 
   */
  constructor(url) {
    /**
     * @type {string}
     */
    this.url = url;

    /**
     * @type {NodeRestClientPromise.Client}
     */
    this.inner = NodeRestClientPromise.Client();
  }

  /**
   * Handle rest shortcut to method GET
   * @param {string} path 
   * @param {Object} args 
   * @returns {Promise}
   */
  get(path, args) {
    return this.handle(() => {
      return this.inner.getPromise(this.url + path, args);
    });
  }

  /**
   * Handle rest shortcut to method GET
   * @param {string} path 
   * @param {Object} postData
   * @returns {Promise}
   */
  post(path, postData) {
    let args = {
      data: postData,
      headers: { "Content-Type": "application/json" }
    };
    return this.handle(() => {
      return this.inner.postPromise(this.url + path, args);
    });
  }

  /**
   * Handle rest call
   * @param {Function} restCallback 
   * @return {Promise}
   */
  async handle(restCallback) {
    try {
      var { data, response } = await restCallback();
      if (!data.status) {
       return new Error("HTTP " + response.statusCode + " - " + response.statusMessage);
      }
      if (response.statusCode !== 200) {
        var apiError = new ClientApiError(data.status.message, data.status.code, response.statusCode);
        apiError.content = data.content || null;
        return apiError;
      }
      return data.content || null;
    } catch (e) {
      return e;
    }
  }
}

module.exports = RestClient;
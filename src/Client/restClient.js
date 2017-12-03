const NodeRestClientPromise = require('node-rest-client-promise');
const EventEmitter = require('events');
const ClientApiError = require("./clientApiError.js");

/**
 * 
 */

/**
 * @class
 * @extends EventEmitter
 */
class RestClient extends EventEmitter {

  /**
   * @event RestClient#restHandle
   * @type {Object}
   * @param {Object} data
   * @param {Object} response
   */

  /**
   * @event RestClient#restError
   * @type {Object}
   * @param {Object} data
   * @param {Object} response
   */

  /**
   * @callback RestClient~restCallback
   */

   /**
    * @callback RestClient~handleCallback
    * @param {Object} data
    * @param {Object} response
    * 
    */

  /**
   * 
   * @param {string} url 
   */
  constructor(url) {
    super();
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
   * @param {RestClient~restCallback} restCallback 
   * @param {RestClient~handleCallback} [handleCallback]
   * @fires RestClient#restHandle
   * @fires RestClient#restError
   * @return {Promise}
   */
  async handle(restCallback, handleCallback = null) {
    try {
      var { data, response } = await restCallback();
      if (!data.status) {
      this.emit("restError", data, response);
       return new Error("HTTP " + response.statusCode + " - " + response.statusMessage);
      }
      if (response.statusCode !== 200) {
        var apiError = new ClientApiError(data.status.message, data.status.code, response.statusCode);
        apiError.content = data.content || null;
        this.emit("restError", data, response);
        return apiError;
      }
      this.emit("restHandle", data, response);
      if (typeof(handleCallback) == "function") {
        handleCallback(data, response);
      }
      return data.content || null;
    } catch (e) {
      return e;
    }
  }
}

module.exports = RestClient;
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
  constructor(url, token = null) {
    super();
    /**
     * @type {string} REST server url
     */
    this.url = url;

    /**
     * @type {string} Token
     */
    this.token = token;

    /**
     * @type {NodeRestClientPromise.Client}
     */
    this.inner = NodeRestClientPromise.Client();
  }

  /**
   * Handle rest call via method GET
   * @param {string} path REST path (ex: /auth, /users/32, /devices/6/sensors, ...)
   * @param {Object} query Query parameters (ex: ?count=20&sort=ASC)
   * @param {Object} args HTTP request arguments
   * @returns {Promise}
   */
  get(path, query = null, args = {}) {
    args.headers = { "Content-Type": "application/json" };
    args.parameters = query;
    return this.handle(() => {
      return this.inner.getPromise(this.url + path, args);
    });
  }

  /**
   * Handle rest call via method GET
   * @param {string} path
   * @param {string} postData
   * @param {Object} args
   * @returns {Promise}
   */
  post(path, postData, args = {}) {
    args.headers = { "Content-Type": "application/json" };
    args.data = postData;
    return this.handle(() => {
      return this.inner.postPromise(this.url + path, args);
    });
  }

  /**
   * Handle raw rest call
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
        throw new Error("HTTP " + response.statusCode + " - " + response.statusMessage);
      }
      if (response.statusCode !== 200) {
        var apiError = new ClientApiError(data.status.message, data.status.code, response.statusCode);
        apiError.content = data.content || null;
        this.emit("restError", data, response);
        throw apiError;
      }
      this.emit("restHandle", data, response);
      if (typeof(handleCallback) == "function") {
        handleCallback(data, response);
      }
      return data.content || null;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = RestClient;
const NodeRestClientPromise = require('node-rest-client-promise');
const EventEmitter = require('events');
const ClientApiError = require("./ClientApiError.js");

/**
 * @class
 * @extends EventEmitter
 */
class RestClient extends EventEmitter {

  /**
   * @callback RestClient~restCallback
   * @returns {Promise<Object>}
   */

   /**
    * @callback RestClient~handleCallback
    * @param {Object} data
    * @param {Object} response
    * @returns {Object}
    */

  /**
   * 
   * @param {string} url 
   * @constructor
   */
  constructor(url, token = null, proxy = null) {
    super();
    /**
     * @type {string} REST server url
     */
    this.url = url;

    /**
     * @type {string} Token
     * @private
     */
    this._token = token;

    /**
     * @type {NodeRestClientPromise.Client}
     */
    this.inner = NodeRestClientPromise.Client(proxy);
  }

  /**
   * Handle rest call via method GET
   * @param {string} path REST path (ex: /auth, /users/32, /devices/6/sensors, ...)
   * @param {Object} query Query parameters (ex: ?count=20&sort=ASC)
   * @param {Object} args HTTP request arguments
   * @returns {Promise<DtoData>}
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
   * @returns {Promise<DtoData>}
   */
  post(path, postData, args = {}) {
    args.headers = { "Content-Type": "application/json" };
    args.data = RestClient.trimData(postData);
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
   * @return {Promise<DtoData>}
   * @private
   */
  async handle(restCallback, handleCallback = null) {
    var { data, response } = await restCallback();
    if (!data.status) {
      throw new ClientApiError(response.statusCode, response.statusMessage);
    }
    if (response.statusCode !== 200) {
      var apiError = new ClientApiError(response.statusCode, data.status.message, data.status.code);
      apiError.content = data.content || null;
      throw apiError;
    }
    if (typeof(handleCallback) == "function") {
      data = handleCallback(data, response);
    }
    return data.content || null;
  }

  /**
   * @type {string}
   * @readonly
   */
  get token() {
    return this._token;
  }

  /**
   * 
   * @param {Dto|DtoData} data 
   * @returns {DtoData}
   * @private
   */
  static trimData(data) {
    if (typeof data.raw == "function") {
      // It's Dto object or simillar -> trim it by raw()
      return data.raw();
    }
    return data;
  }
}

module.exports = RestClient;
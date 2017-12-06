const NodeRestClientPromise = require('node-rest-client-promise');
const ClientApiError = require("./ClientApiError.js");

/**
 * @class
 */
class RestClient {

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
   * @param {string} [token]
   * @param {HttpProxy} [proxy]
   * @constructor
   */
  constructor(url, token = null, proxy = null) {
    /**
     * @type {string}
     */
    this.url = url;

    /**
     * @type {string}
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
   * @returns {Promise<ResultSet<DtoData,RestMeta>>}
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
   * @param {QueryObject}
   * @param {Object} args
   * @returns {Promise<ResultSet<DtoData,RestMeta>>}
   */
  post(path, postData, query = null, args = {}) {
    args.headers = { "Content-Type": "application/json" };
    args.data = RestClient.trimData(postData);
    args.query = query;
    return this.handle(() => {
      return this.inner.postPromise(this.url + path, args);
    });
  }

  /**
   * Handle raw rest call
   * @param {RestClient~restCallback} restCallback 
   * @param {RestClient~handleCallback} [handleCallback]
   * @return {Promise<ResultSet<DtoData,RestMeta>>}
   * @private
   */
  async handle(restCallback, handleCallback = null) {
    var { data, response } = await restCallback();
    // Fail if additional status is undefined
    if (!data.status) {
      throw new ClientApiError(`HTTP(${response.statusCode}): ${response.statusMessage}`);
    }
    // Fail on http status not success
    if ([ 200, 201, 202 ].indexOf(response.statusCode) < 0) {
      var apiError = new ClientApiError(`${data.status.code}(${response.statusCode}): ${data.status.message}`, data.status);
      apiError.content = data.content || null;
      throw apiError;
    }
    // Handle callback if callback function defined
    if (typeof(handleCallback) == "function") {
      handleCallback(data, response);
    }
    return [ data.content || null, { status: data.status, httpResponse: response } ];
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
const NodeRestClientPromise = require('node-rest-client-promise');
const CaloriosaApiError = require("./CaloriosaApiError.js");
const RestError = require("./RestError.js");
const Util = require("../../util/util.js");

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
    /**
     * @type {EventEmmiter}
     */
    this.emiter = null;
  }

  /**
   * Handle rest call via method GET
   * @param {string} path REST path (ex: /auth, /users/32, /devices/6/sensors, ...)
   * @param {Object} query Query parameters (ex: ?count=20&sort=ASC)
   * @param {Object} args HTTP request arguments
   * @returns {Promise<RestResult>}
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
   * @returns {Promise<RestResult>}
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
   * @return {Promise<RestResult>}
   * @private
   */
  async handle(restCallback, handleCallback = null) {
    var [ err, result ] = await Util.saferize(restCallback());
    var { data, response } = result || {};
    // Fail if general error occurred from request
    if(err) {
      throw new RestError(err.message);
    }
    // Fail if no data is in result
    if (!data) {
      throw new RestError("Server returned empty result (no data)");
    }
    // Fail if additional status is undefined
    if (!data.status) {
      throw new RestError(`HTTP(${response.statusCode}): ${response.statusMessage}`, response);
    }
    // Fail on http status not success
    if ([ 200, 201, 202 ].indexOf(response.statusCode) < 0) {
      throw new CaloriosaApiError(`${data.status.code}(${response.statusCode}): ${data.status.message}`,
        RestClient.createRestResult(data, response));
    }
    // Handle callback if callback function defined
    if (typeof(handleCallback) == "function") {
      handleCallback(data, response);
    }
    this.emiter.emit("handle", data, response);
    return RestClient.createRestResult(data, response);
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
   * @param {Object} data 
   * @returns {Object}
   * @private
   */
  static trimData(data) {
    if (!(data instanceof Object)) {
      throw new TypeError("Data to trim must be an object");
    }
    if (data.constructor.name.toLowerCase() != "object") {
      return Util.toRawObject(data);
    }
    return data;
  }

  /**
   * @param {Object} data 
   * @param {Response} response 
   * @returns {RestResult}
   * @private
   */
  static createRestResult(data, response) {
    return {
      content: data.content || null,
      meta: { 
        status: data.status || null,
        response: response 
      }
    };
  }
}

module.exports = RestClient;
const { DefaultClientOptions } = require("../typedefs.js");
const EventEmmiter = require("events");
const NodeRestClientPromise = require('node-rest-client-promise');
const CaloriosaApiError = require("./CaloriosaApiError.js");
const RestError = require("./RestError.js");
const Util = require("../util/util.js");

/**
 * @class
 */
class Client {

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
     * @constructor
     * @param {ClientOptions} options 
     */
    constructor(options = {}) {    
        /**
         * @private
         */
        this._options = Util.mergeDefault(DefaultClientOptions, options);
        /**
         * @type {NodeRestClientPromise.Client}
         */
        this.inner = NodeRestClientPromise.Client(this._options.proxy); 
        /**
         * @type {string}
         */
        this.url = this._options.url;
        /**
         * @type {RestClient}
         * @private
         */
        this._token = this._options.token || null;
        this.emiter = new EventEmmiter();
        this.defaultArgs = {
          headers: { "Content-Type": "application/json" }
        };
    }

    /**
     * @type {ClientOptions}
     * @readonly
     */
    get options() {
        return this._options;
    }

    /**
     * @type {string}
     * @readonly
     */
    get token() {
        return this._token;
    }

    /**
   * Handle rest call via method GET
   * @param {string} path REST path (ex: /auth, /users/32, /devices/6/sensors, ...)
   * @param {Object} [query] Query parameters (ex: ?count=20&sort=ASC)
   * @param {string} [token]
   * @param {Object} [args] HTTP request arguments
   * @returns {Promise<RestResult>}
   */
  get(path, query = null, token = null, args = {}) {
    args = Util.mergeDefault(this.defaultArgs, args);
    args.parameters = query;
    Client.injectToken(token || this.token, args);
    return this.handle(() => {
      return this.inner.getPromise(this.url + path, args);
    });
  }

  /**
   * Handle rest call via method GET
   * @param {string} path
   * @param {string} postData
   * @param {QueryObject} [query]
   * @param {string} [token]
   * @param {Object} [args]
   * @returns {Promise<RestResult>}
   */
  post(path, postData, query = null, token = null, args = {}) {
    args = Util.mergeDefault(this.defaultArgs, args);
    args.data = RestClient.trimData(postData);
    args.query = query;
    Client.injectToken(token || this.token, args);
    return this.handle(() => {
      return this.inner.postPromise(this.url + path, args);
    });
  }

  /**
   * Handle raw rest call
   * @param {Client~restCallback} restCallback 
   * @param {Client~handleCallback} [handleCallback]
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
        Client.createRestResult(data, response));
    }
    // Handle callback if callback function defined
    if (typeof(handleCallback) == "function") {
      handleCallback(data, response);
    }
    this.emiter.emit("handle", data, response);
    return Client.createRestResult(data, response);
  }

  /**
     * Handle an event
     * @param {string} event 
     * @param {function} callback 
     */
    on(event, callback) {
      return this.emiter.on(event, callback);
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

  static injectToken(token, args) {
    if (token) {
      args.headers.authorization = `Bearer ${token}`
    }
  }
}

module.exports = Client;
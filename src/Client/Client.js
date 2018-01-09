const { DefaultClientOptions } = require("../typedefs.js")
const EventEmmiter = require("events")
const axios = require("axios")
const CaloriosaApiError = require("./CaloriosaApiError.js")
const RestError = require("./RestError.js")
const Util = require("../util/util.js")

/**
 * @class
 */
class Client {
  /**
   * @event Client#response
   * @type {Response}
   */

  /**
   * @event Client#request
   * @type {Object}
   */

  /**
   * @event Client#error
   * @type {Error}
   */

  /**
   * @constructor
   * @param {ClientOptions} options
   */
  constructor (options = {}) {
    /**
     * @private
     */
    this._options = Util.mergeDefault(DefaultClientOptions, options)
    /**
     * @type {string}
     */
    this.url = this._options.url
    /**
     * @type {RestClient}
     * @private
     */
    this._token = this._options.token || null
    this._appSignature = this._options.appSignature
    this.emiter = new EventEmmiter()
    this.defaultArgs = {
      baseURL: this.url,
      headers: {
        "Content-Type": "application/json",
        "X-Dto-Client": "rest-dto-node",
        "X-Application": this._options.appSignature || null
      },
      proxy: this._options.proxy || null
    }
  }

  /**
   * @type {ClientOptions}
   * @readonly
   */
  get options () {
    return this._options
  }

  /**
   * @type {String}
   */
  get token () {
    return this._token
  }

  /**
   * @type {String}
   */
  set token (val) {
    this._token = val
  }

  /**
   * @type {String}
   * @readonly
   */
  get appSignature () {
    return this.defaultArgs.headers["X-Application"] || null
  }

  /**
   * Handle rest call via method GET
   * @param {string} path REST path (ex: /auth, /users/32, /devices/6/sensors, ...)
   * @param {Object} [query] Query parameters (ex: ?count=20&sort=ASC)
   * @param {Object} [args] HTTP request arguments
   * @returns {Promise<Response>}
   */
  get (endpoint, query = null, args = {}) {
    args.params = query
    return this.callApi("get", endpoint, args)
  }

  /**
   * Handle rest call via method GET
   * @param {string} path
   * @param {string} postData
   * @param {QueryObject} [query]
   * @param {Object} [args]
   * @returns {Promise<Response>}
   */
  post (endpoint, postData, query = null, args = {}) {
    args.data = Client.trimData(postData)
    args.params = query
    return this.callApi("post", endpoint, args)
  }

  /**
   * Handle rest call via method GET
   * @param {string} path
   * @param {string} postData
   * @param {QueryObject} [query]
   * @param {Object} [args]
   * @returns {Promise<Response>}
   */
  patch (endpoint, postData, query = null, args = {}) {
    args = Util.mergeDefault(this.defaultArgs, args)
    args.data = Client.trimData(postData)
    args.params = query
    return this.callApi("patch", endpoint, args)
  }

  /**
   *
   * @param {string} path
   * @param {QueryObject} query
   * @param {Object} args
   * @returns {Promise<Response>}
   */
  delete (endpoint, query = null, args = {}) {
    args = Util.mergeDefault(this.defaultArgs, args)
    args.parameters = query
    return this.callApi("delete", endpoint, args)
  }

  /**
   * Handle raw rest call
   * @param {String} method
   * @param {String} endpoint
   * @param {Object} args
   * @fires Client#request
   * @fires Client#response
   * @fires Client#error
   * @return {Promise<Object>}
   */
  async callApi (method, endpoint, args) {
    let request = Util.mergeDefault(this.defaultArgs, args)
    let err,
      response,
      data

    request.method = method
    request.url = typeof endpoint === "string" ? endpoint : endpoint.toString()
    Client.injectToken(this.token, request)
    this.emiter.emit("request", request);
    [err, response] = await Util.saferize(axios(request))
    if (err) {
      return this.resolveError(err)
    }
    data = response.data
    this.validateResult(data)
    this.emiter.emit("response", data, response)
    return {
      content: data.content,
      status: data.status,
      response
    }
  }

  /**
   *
   * @private
   * @fires Client#error
   */
  resolveError (err) {
    if (err.response && err.response.data && err.response.data.status) {
      err = new CaloriosaApiError(err.response.data.status.code, err.response.data.status.message, err)
    } else if (err.response) {
      err = new RestError(`${err.response.status} - ${err.response.statusText}`, err)
    }
    this.emiter.emit("error", err)
    return Promise.reject(err)
  }

  validateResult (res) {
    if (!res) {
      throw new ReferenceError("No response data given!")
    }
    if (!res.content) {
      throw new ReferenceError("No content given from response data!")
    }
    if (!res.status) {
      throw new ReferenceError("No status metadata given from response data!")
    }
  }

  /**
    * Handle an event
    * @param {string} event
    * @param {function} callback
    */
  on (event, callback) {
    return this.emiter.on(event, callback)
  }

  /**
   *
   * @param {Object} data
   * @returns {Object}
   * @private
   */
  static trimData (data) {
    if (Array.isArray(data)) {
      const cleanArr = []
      data.forEach(element => {
        cleanArr.push(Client.trimData(element))
      })
      return cleanArr
    }
    if (data instanceof Object) {
      return Util.toRawObject(data)
    }
    return data
  }

  /**
   * @param {String} token
   * @param {Object} args
   * @private
   */
  static injectToken (token, args) {
    if (token) {
      args.headers.Authorization = `Bearer ${token}`
    }
  }
}

module.exports = Client

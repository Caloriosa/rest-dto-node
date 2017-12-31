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
        "X-Dto-Client": "rest-dto-node"
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
    return this._appSignature
  }

  /**
   * Handle rest call via method GET
   * @param {string} path REST path (ex: /auth, /users/32, /devices/6/sensors, ...)
   * @param {Object} [query] Query parameters (ex: ?count=20&sort=ASC)
   * @param {Object} [args] HTTP request arguments
   * @returns {Promise<Response>}
   */
  get (path, query = null, args = {}) {
    args.parameters = query
    return this.callApi("get", path, args)
  }

  /**
   * Handle rest call via method GET
   * @param {string} path
   * @param {string} postData
   * @param {QueryObject} [query]
   * @param {Object} [args]
   * @returns {Promise<Response>}
   */
  post (path, postData, query = null, args = {}) {
    args.data = Client.trimData(postData)
    args.parameters = query
    return this.callApi("post", path, args)
  }

  /**
   * Handle rest call via method GET
   * @param {string} path
   * @param {string} postData
   * @param {QueryObject} [query]
   * @param {Object} [args]
   * @returns {Promise<Response>}
   */
  patch (path, postData, query = null, args = {}) {
    args = Util.mergeDefault(this.defaultArgs, args)
    args.data = Client.trimData(postData)
    args.query = query
    return this.callApi("patch", path, args)
  }

  /**
   *
   * @param {string} path
   * @param {QueryObject} query
   * @param {Object} args
   * @returns {Promise<Response>}
   */
  delete (path, query = null, args = {}) {
    args = Util.mergeDefault(this.defaultArgs, args)
    args.parameters = query
    return this.callApi("delete", path, args)
  }

  /**
   * Handle raw rest call
   * @param {String} method
   * @param {String} path
   * @param {Object} args
   * @fires Client#request
   * @fires Client#response
   * @fires Client#error
   * @return {Promise<Response>}
   */
  async callApi (method, path, args) {
    const request = Util.mergeDefault(this.defaultArgs, args)
    let err,
      response

    request.method = method
    request.url = path
    Client.injectToken(this.token, request)
    Client.injectSignature(this.appSignature, request)
    this.emiter.emit("request", request);
    [err, response] = await Util.saferize(axios(request))
    if (err) {
      return this.resolveError(err)
    }
    this.emiter.emit("response", response)
    return response
  }

  /**
   *
   * @private
   * @fires Client#error
   */
  resolveError (err) {
    let error
    if (err.response && err.response.data && err.response.data.status) {
      error = new CaloriosaApiError(err.response.data.status.code, err.response.data.status.message, err)
    } else if (err.response) {
      error = new RestError(`${err.response.status} - ${err.response.statusText}`, err)
    } else {
      error = new RestError(err.message, err)
    }
    this.emiter.emit("error", error)
    return Promise.reject(error)
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
   * @param {Object} data
   * @param {Response} response
   * @returns {RestResult}
   * @private
   */
  static createRestResult (response) {
    const data = response.data || {}
    return {
      content: data.content || null,
      meta: {
        status: data.status || null,
        response
      }
    }
  }

  static injectToken (token, args) {
    if (token) {
      args.headers.Authorization = `Bearer ${token}`
    }
  }

  static injectSignature (signature, args) {
    if (signature) {
      args.headers["X-Application"] = signature
    }
  }
}

module.exports = Client

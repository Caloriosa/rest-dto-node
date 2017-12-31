const Client = require("./Client")
const Util = require("../util/util")
const EventEmiter = require("events")

const AuthService = require("../Services/AuthService")
const UserService = require("../Services/UserService")

/**
 * @class
 * @extends {EventEmiter}
 */
class API extends EventEmiter {
  /**
     * @constructor
     * @param {Client} client
     */
  constructor (client) {
    super()
    this._client = client
    this._services = {}
  }

  get client () {
    return this._client
  }

  get token () {
    return this.client.token
  }

  set token (val) {
    this.client.token = val
  }

  /**
     *
     * @param {String} login
     * @param {String} password
     * @returns {Promise<AuthInfo>}
     */
  async login (login, password) {
    const [err, authInfo] = await Util.saferize(this.auth.authenticate(login, password))
    if (err) {
      this.emit("error", err)
      return Promise.reject(err)
    }
    this.token = authInfo.token
    this.emit("loggedin", authInfo)
    return authInfo
  }

  /**
     * @returns {Promise}
     */
  async logout () {
    const [err] = await Util.saferize(this.auth.logout())
    if (err) {
      this.emit("error", err)
      return Promise.reject(err)
    }
    this.token = null
  }

  /* Services */

  /**
     * @type {AuthService}
     * @readonly
     */
  get auth () {
    if (!this._services.auth) {
      this._services.auth = new AuthService(this.client)
    }
    return this._services.auth
  }

  /**
     * @type {UserService}
     * @readonly
     */
  get users () {
    if (!this._services.users) {
      this._services.users = new UserService(this.client)
    }
    return this._services.users
  }

  static createApiClient (options) {
    return new API(new Client(options))
  }
}

module.exports = API

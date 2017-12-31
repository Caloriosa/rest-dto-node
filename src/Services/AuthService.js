const AuthInfo = require('../Entities/AuthInfo.js')
const Manager = require('../DTO/Manager.js')
const Mapper = require('../DTO/Mapper.js')
const Endpoint = require('../util/Endpoint.js')

/**
 * @class
 */
class UserService {
  /**
   *
   * @param {Client} client
   * @param {string} [token]
   * @constructor
   */
  constructor (client) {
    /**
     * @type {RestClient}
     * @private
     */
    this._client = client
    /**
     * @type {Manager}
     * @private
     */
    this._authManager = new Manager(new Mapper(AuthInfo), this._client)
  }

  /**
   * Authorize user and login
   * Restriction: NONE
   * Verification: APP SIGNATURE
   * @param {string} login
   * @param {string} password
   */
  async authenticate (login, password) {
    return this._authManager.pushEntity(new Endpoint('/auth'), { login, password })
  }

  /**
   * User logout
   * Restriction: USER, ADMIN, DEVICE
   * Verification: APP SIGNATURE + TOKEN
   * @return {Promise}
   */
  async logout () {
    return this._authManager.deleteEntity(new Endpoint('/auth'))
  }
}

module.exports = UserService

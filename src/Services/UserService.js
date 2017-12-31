const User = require("../Entities/User.js")
const Manager = require("../DTO/Manager.js")
const Mapper = require("../DTO/Mapper.js")
const Endpoint = require("../util/Endpoint.js")
const DataResolver = require("../util/DataResolver.js")
const Client = require("../Client/Client.js")

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
    // TODO: Rewrite this constructor stuff to UserService factory. Keep only manager and require it in constructor params
    /**
     * @type {RestClient}
     * @private
     */
    this._client = client
    /**
     * @type {Manager}
     * @private
     */
    this._manager = new Manager(new Mapper(User), this._client)
  }

  /**
   * Get users
   * @param {QueryObject} query
   * @returns {Promise<ResultSet<Collection<string, User>, MetaInfo>>}
   */
  fetchUsers (query = null) {
    return this._manager.fetchCollection(new Endpoint("/users"), query)
  }

  fetchUser (uid) {
    return this._manager.fetchEntity(new Endpoint("/users/${id}", { id: uid }))
  }

  fetchUserByLogin (login) {
    if (!login) {
      throw new ReferenceError("Login name can't be null or undefined!")
    }
    return this._manager.fetchEntity(new Endpoint("/users"), {
      filter: {
        login
      }
    })
  }
  /**
   * Fetch curently logged user (by token)
   * Restriction: MEMBER, ADMIN
   * @returns {Promise<User>}
   */
  fetchMe () {
    return this._manager.fetchEntity(new Endpoint("/users/me"))
  }

  /**
   * Patch curently logged user (by token)
   * Restriction: MEMBER, ADMIN
   * Verification: TOKEN + USER'S PASSWORD
   * @param {User} user
   * @param {string} currentPassword
   * @returns {Promise<User>}
   */
  setMe (user, currentPassword) {
    return this._manager.patchEntity(new Endpoint("/users/me"), Mapper.demapMerge(user, { current_password: currentPassword }))
  }

  /**
   * Register new user
   * Restriction: NONE
   * Verification: APP SIGNATURE
   * @param {Promise<User>} user
   */
  register (user) {
    return this._manager.pushEntity(new Endpoint("/users/register"), user)
  }

  /**
   * Activate a user account
   * Restriction: NONE
   * Verification: APP SIGNATURE
   * @param {string} activationCode
   * @returns {Promise<User>}
   */
  activate (activationCode) {
    return this._manager.pushEntity(new Endpoint("/users/activate"), { activation_token: activationCode })
  }

  /**
   * Udpate a user or create new
   * Restriction: ADMIN
   * Verification: TOKEN
   * @param {User|DtoData} entity
   * @param {string} [uid]
   * @returns {Promise<User>}
   */
  setUser (entity, uid = null) {
    uid = DataResolver.resolveUid(uid || entity)
    if (uid) {
      return this._manager.patchEntity(new Endpoint("/users/${id}", { id: uid }), entity)
    }
    return this._manager.pushEntity(new Endpoint("/users"), entity)
  }

  /**
   * Fetch user's owned devices
   * Restriction: NONE
   * Verification: NONE
   * @param {User|string} user
   */
  async fetchUserDevices (user) {
    const uid = DataResolver.resolveUid(user)
    // TODO: Write user's devices fetcher
  }
}

module.exports = UserService

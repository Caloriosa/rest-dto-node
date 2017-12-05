const User = require("../Entities/User.js");
const Manager = require("../DTO/Manager.js");
const Mapper = require("../DTO/Mapper.js");
const Endpoint = require("../util/Endpoint.js");
const DataResolver = require("../util/DataResolver.js");

/**
 * @class
 */
class UserService {

  /**
   * 
   * @param {RestClient} rest 
   * @constructor
   */
  constructor(rest) {
    // TODO: Rewrite this constructor stuff to UserService factory. Keep only manager and require it in constructor params
    /**
     * @type {RestClient}
     * @private
     */
    this._rest = rest;
    /**
     * @type {Mapper}
     * @private
     */
    this._mapper = new Mapper(this._userFactory);
    /**
     * @type {Manager}
     * @private
     */
    this._manager = new Manager(this._mapper, this._rest);
  }

  /**
   * 
   * @param {DtoData} dtoData 
   * @private
   */
  _userFactory(dtoData) {
    return new User(dtoData);
  }

  /**
   * Get users
   * @param {QueryObject} query 
   */
  fetchUsers(query = null) {
    return this._manager.fetchCollection(new Endpoint("/users"), query);
  }

  save(entity, uid = null) {
    uid = DataResolver.resolveUid(uid || entity);
    if (uid) {
      return this._manager.patchEntity(new Endpoint("/users/${id}", {id: uid}), entity);
    }
    return this._manager.pushEntity(new Endpoint("/users"), entity);
  }

  /**
   * 
   * @param {User|string} user 
   */
  async fetchUserDevices(user) {
    let uid = DataResolver.resolveUid(user);
   // TODO: Write user's devices fetcher
  }
}

module.exports = UserService;
const Manager = require("./Manager.js");
const User = require("../DTO/User.js");
const DataResolver = require("../util/DataResolver.js");

/**
 * @class
 * @extends {Manager}
 */
class UserManager extends Manager {

  /**
   * @type {string}
   * @readonly
   */
  get basePath() {
    return "/users"
  }

  /**
   * @param {DtoData} data 
   * @returns {User}
   */
  createNewEntity(data = {}) {
    return new User(this, data)
  }

  createUser(login, password, email) {
    return createNewEntity({login: login, password: password, email: email});
  }

  /**
   * 
   * @param {User|string} user 
   */
  async getUserDevices(user) {
    let uid = DataResolver.resolveUid(user);
   // TODO: Write user's devices fetcher
  }
}

module.exports = UserManager;
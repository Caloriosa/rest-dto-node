const Manager = require("./Manager.js");
const User = require("../DTO/User.js");

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
  createDtoEntity(data = {}) {
    return new User(this, data)
  }
}

module.exports = UserManager;
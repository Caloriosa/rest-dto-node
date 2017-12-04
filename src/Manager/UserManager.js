const Manager = require("./Manager.js");
const User = require("../DTO/User.js");

/**
 * @class
 * @extends {Manager}
 */
class UserManager extends Manager {

  /**
   * @param {DtoData} data 
   * @returns {User}
   */
  createUserEntity(data = {}) {
    return new User(this, data)
  }

  /**
   * Get all users
   * @param {QueryObject} query
   * @returns {Collection<User>}
   */
  async fetchAll(query = null) {
    return this.createDtoCollection(await this.rest.get("/users", query), data => this.createUserEntity(data));
  }

  async get(uid) {
    return new User(this.client, await this.rest.get("/users", query), data => this.createUserEntity(data));
  }

  /**
   * 
   * @param {User} user 
   * @returns {Promise<User>}
   */
  async save(user) {
    if (user.id) {
      //TODO: Write method for UPDATE entity
      throw new Error("Update user not implemented yet!");
    }
    return this.createUserEntity(await this.rest.post("/users", user));
  }
  
}

module.exports = UserStore;
const AbstractStore = require("./abstractStore.js");
const User = require("../DTO/user.js");

/**
 * @class
 */
class UserStore extends AbstractStore {

  /**
   * @returns {Collection<User>}
   */
  async fetch(query = null) {
    return this.createDtoCollection(await this.rest.get("/users", query), data => new User(data));
  }

  /**
   * Create a user
   * @param {User} user 
   * @returns {Promise<User>}
   */
  async create(user) {
    return new User(await this.rest.post("/users", user.raw()));
  }
  
  /**
   * Get my user profile (Must by logged in)
   * @returns {Promise<User>}
   */
  async getMe() {
    return new User(await this.rest.get("/users/me"));
  }
  
  /**
   * Set my user profile (Must be logged in)
   * @param {User} user
   * @returns {Promise<User>}
   */
  async setMe(user) {
    return new User(await this.rest.patch("/users/me", user.raw()));
  }
}

module.exports = UserStore;

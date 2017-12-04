const AbstractStore = require("./abstractStore.js");
const User = require("../DTO/user.js");

/**
 * @class
 */
class UserStore extends AbstractStore {

  /**
   * User entity factory
   * @returns {User}
   */
  createUserEntity(data) {
    return new User(data);
  }
  /**
   * @returns {Collection<User>}
   */
  async fetch(query = null) {
    return this.createDtoCollection(await this.rest.get("/users", query), data => this.createUserEntity(data));
  }

  /**
   * Create a user
   * @param {User} user 
   * @returns {Promise<User>}
   */
  async createUser(user) {
    return this.createUserEntity(await this.rest.post("/users", user.raw()));
  }
  
  /**
   * Get my user profile (Must by logged in)
   * @type {Promise<User>}
   */
  get me() {
    async function getMe() {
      return this.createUserEntity(await this.rest.get("/users/me"));
    }
    return getMe();
  }
  
  /**
   * Set my user profile (Must be logged in)
   * @param {User} user
   * @returns {Promise<User>}
   */
  async updateMe(user) {
    return this.createUserEntity(await this.rest.patch("/users/me", user.raw()));
  }
}

module.exports = UserStore;

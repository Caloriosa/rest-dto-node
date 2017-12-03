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
   * @returns {User}
   */
  create(user) {
    return this.rest.post("/users", user.raw());
  }
  
}

module.exports = UserStore;
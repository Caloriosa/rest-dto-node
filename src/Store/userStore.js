const AbstractStore = require("./abstractStore.js");
const User = require("../DTO/user.js");

/**
 * @class
 */
class UserStore extends AbstractStore {

  /**
   * @returns {Collection<User>}
   */
  async fetch() {
    return this.createDtoCollection(await this.rest.get("/users"), data => new User(data));
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
const AbstractStore = require("./abstractStore.js");
const User = require("../DTO/user.js");

/**
 * @class
 */
class UserStore extends AbstractStore {

  /**
   * @returns {Object[]}
   */
  async fetch() {
    return this.createDtoCollection(await this.rest.get("/users"), data => new User(data));
  }

  create(user) {
    return this.rest.post("/users", user.raw());
  }
  
}

module.exports = UserStore;
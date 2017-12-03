const AbstractManager = require("./abstractManager.js");

class UserManager extends AbstractManager {

  async fetchUsers() {
    return await this.rest.get(this.url + "/users");
  }
  
}
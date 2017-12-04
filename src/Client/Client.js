const BaseClient = require("./BaseClient.js");
const DefaultClientOptions = require("../typedefs.js").DefaultClientOptions;
const ApiError = require("../typedefs.js").ApiError;
const UserManager = require("../Manager/UserManager.js");

/**
 * @class
 * @desc Caloriosa service REST client
 * @extends {BaseClient}
 */
class Client extends BaseClient {

  /**
   * Login to Caloriosa REST service
   * @param {string} login 
   * @param {string} password 
   * @returns {Promise<AuthInfo>}
   */
  async authenticate(login, password) {
    let authInfo = await this.rest.post("/auth", {login: login, password: password});
    this.rest.token = authInfo.token;
    return authInfo;
  }

  /**
   * @type {UserManager}
   * @readonly
   */
  get users() {
    if (!this._users) {
      this._users = new UserManager(this);
    }
    return this._users
  }
}

module.exports = Client;
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

  constructor(options = {}) {
    super(options);
    this.createManagers();
  }

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
   * @private
   */
  createManagers() {
    this._users = new UserManager(this);
  }

  /**
   * @type {UserManager}
   * @readonly
   */
  get users() {
    return this._users
  }
}

module.exports = Client;
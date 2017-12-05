const BaseClient = require("./BaseClient.js");
const DefaultClientOptions = require("../typedefs.js").DefaultClientOptions;
const ApiError = require("../typedefs.js").ApiError;
const Collection = require("../util/collection.js");
const UserService = require("../Services/UserService.js");

/**
 * @class
 * @desc Caloriosa service REST client
 * @extends {BaseClient}
 */
class Client extends BaseClient {

  constructor(options = {}) {
    super(options);
    /**
     * @type {Collection<string,Object>}
     * @private
     */
    this._services = new Collection();
    this.createServices();
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

  addService(name, service) {
    if (this._services.get(name)) {
      throw new Error(`Service with name '${name}' already exists!`);
    }
    this._services.set(name, service);
    return service;
  }

  /**
   * 
   * @param {string} name 
   * @returns {?Object}
   */
  getService(name) {
    return this._services.get(name);
  }

  removeService(name) {
    if (!this._services.get(name)) {
      throw new Error(`Service with name '${name}' not exists!`);
    }
    this._services.delete(name);
  }

   /**
   * @private
   */
  createServices() {
    this.addService("users", new UserService(this.rest));
  }

  /**
   * Shortcut to user service
   * @type {UserManager}
   * @readonly
   */
  get users() {
    return this.getService("users");
  }
}

module.exports = Client;
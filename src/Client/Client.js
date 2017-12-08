const BaseClient = require("./BaseClient.js");
const DefaultClientOptions = require("../typedefs.js").DefaultClientOptions;
const ApiError = require("../typedefs.js").ApiError;
const AuthError = require("./AuthError.js");
const Collection = require("../util/collection.js");
const UserService = require("../Services/UserService.js");
const Util = require("../util/util.js");

/**
 * @class
 * @desc Caloriosa service REST client
 * @extends {BaseClient}
 * @fires Client#ready
 * @fires Client#auth
 * @fires Client#serviceAdded
 * @fires Client#serviceRemoved
 * @fires Client#handle
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
    this.emiter.emit("ready", this);
  }

  /**
   * Login to Caloriosa REST service
   * @param {string} login 
   * @param {string} password 
   * @returns {Promise<AuthInfo>}
   */
  async authenticate(login, password) {
    let [ err, authInfo ] = await Util.saferize(this.rest.post("/auth", {login: login, password: password}));
    if (err) {
      throw new AuthError(err.message);
    }
    this.rest.token = authInfo.token;
    this.emiter.emit("auth", authInfo);
    return authInfo;
  }

  addService(name, service) {
    if (this._services.get(name)) {
      throw new Error(`Service with name '${name}' already exists!`);
    }
    this._services.set(name, service);
    this.emiter.emit("serviceAdded", name, service);
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
    this.emiter.emit("serviceRemoved", name);
  }

   /**
   * @private
   */
  createServices() {
    this.addService("users", new UserService(this.rest));
  }

  /**
   * Shortcut to user service
   * @type {UserService}
   * @readonly
   */
  get users() {
    return this.getService("users");
  }
}

module.exports = Client;
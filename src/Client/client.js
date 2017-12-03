const RestClient = require("./restClient.js");
const ClientOptions = require("../typedefs.js").ClientOptions;
const ApiError = require("../typedefs.js").ApiError;
const UserStore = require("../Store/userStore.js");

/**
 * @class
 * @desc Caloriosa REST client
 */
class Client {
  /**
   * @constructor
   * @param {ClientOptions} options 
   */
  constructor(options = ClientOptions) {
    /**
     * @type {RestClient}
     */
    this.rest = new RestClient(options.url, options.token);

    /**
     * @private
     */
    this._options = options;
  }

  authenticate(login, password) {
    this.rest.post("/auth", {login: login, password: password})
      .then(authInfo => {
        this.rest.token = authInfo.token;
      });
  }

  /**
   * @type {ClientOptions}
   * @readonly
   */
  get options() {
    return this._options;
  }

  /**
   * @type {string}
   * @readonly
   */
  get token() {
    return this.rest.token;
  }

  /**
   * @type {UserStore}
   * @readonly
   */
  get users() {
    if (!this._users) {
      this._users = new UserStore(this.rest);
    }
    return this._users
  }
}

module.exports = Client;
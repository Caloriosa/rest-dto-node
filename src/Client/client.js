const RestClient = require("./restClient.js");
const ClientOptions = require("../typedefs.js").ClientOptions;
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
     * @type {NodeRestClientPromise.Client}
     */
    this.rest = new RestClient(options.url);

    /**
     * @private
     */
    this._options = options;
  }

  /**
   * @type {ClientOptions}
   * @readonly
   */
  get options() {
    return this._options;
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
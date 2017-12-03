const RestClient = require("./restClient.js");
const ClientOptions = require("../typedefs.js").ClientOptions;

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
}

module.exports = Client;
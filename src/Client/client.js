const NodeRestClientPromise = require('node-rest-client-promise');
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
    this.rest = NodeRestClientPromise.Client();

    /**
     * @type {String}
     */
    this.url = options.url;

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
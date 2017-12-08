const RestClient = require("./rest/RestClient.js");
const Util = require("../util/util.js");
const { DefaultClientOptions } = require("../typedefs.js");
const EventEmmiter = require("events");

/**
 * @class
 */
class BaseClient {
    /**
     * @constructor
     * @param {ClientOptions} options 
     */
    constructor(options = {}) {
        /**
         * @private
         */
        this._options = Util.mergeDefault(DefaultClientOptions, options);

        /**
         * @type {RestClient}
         * @private
         */
        this._rest = new RestClient(this._options.url, this._options.token, this._options.proxy);
        this.emiter = new EventEmmiter();
        this._rest.emiter = this.emiter;
    }

    /**
     * Login to Caloriosa REST service
     * @param {string} login 
     * @param {string} password 
     * @returns {Promise<AuthInfo>}
     */
    async fetchIdentity() {
        let ident = await this.rest.get("/auth/identity");
        return ident;
    }

    /**
     * Handle an event
     * @param {string} event 
     * @param {function} callback 
     */
    on(event, callback) {
        return this.emiter.on(event, callback);
    }

    /**
     * @type {RestClient}
     * @readonly
     */
    get rest() {
        return this._rest;
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
}

module.exports = BaseClient;
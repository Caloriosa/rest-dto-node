const RestClient = require("./rest/RestClient.js");
const Util = require("../util/util.js");
const { DefaultClientOptions } = require("../typedefs.js");
const EventEmmiter = require("events");

/**
 * @class
 */
class Client {
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
        this._token = this._options.token || null;
        this._rest = new RestClient(this._options.url, this._options.proxy);
        this.emiter = new EventEmmiter();
        this._rest.emiter = this.emiter;
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
        return this._token;
    }
}

module.exports = Client;
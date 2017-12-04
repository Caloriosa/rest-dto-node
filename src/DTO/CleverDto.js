const Dto = require("./abstractDto.js");

/**
 * @class
 * @extends AbstractDto
 */
class CleverDto extends Dto {

    /**
     * 
     * @param {Client} client 
     * @param {Object} data 
     */
    constructor(client, data = {}) {
        super(data);
        /**
         * @type {Client}
         * @private
         */
        this._client = client;
    }

    /**
     * Get Client instance
     * @returns {Client}
     */
    get client() {
        return this._client;
    }

}
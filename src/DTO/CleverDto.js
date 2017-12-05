const Dto = require("./Dto.js");

/**
 * @class
 * @abstract
 * @extends {Dto}
 */
class CleverDto extends Dto {
    /**
     * 
     * @param {Manager} manager 
     * @param {Object} data 
     * @constructor
     */
    constructor(manager, data = {}) {
        super(data);
        /**
         * @type {Manager}
         * @private
         */
        this._manager = manager;
    }

    /**
     * @type {Manager}
     */
    get manager() {
        return this._manager;
    }

    /**
     * Get Client instance
     * @returns {Client}
     * @readonly
     */
    get client() {
        return this._manager.client;
    }

    save(data = null) {
        if (!data) {
            data = this;
        }
        return this.manager.save(data, this.uid);
    }
}

module.exports = CleverDto;
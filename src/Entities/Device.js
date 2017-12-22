const Entity = require("../DTO/Entity.js");

/**
 * @class
 * @extends {Entity}
 */
class Device extends Entity {

    /**
     * @type {String}
     */
    get name() {
        return this._data.name || null;
    }

    /**
     * @type {String}
     */
    get title() {
        return this._data.title || "";
    }

    /**
     * @type {String}
     */
    set title(val) {
        this._data.title = val;
    }

    /**
     * @type {String}
     */
    get description() {
        return this._data.description || "";
    }

    /**
     * @type {String}
     */
    set description(val) {
        this._data.description = val;
    }

    /**
     * @type {String}
     */
    get location() {
        return this._data.location || "";
    }

    /**
     * @type {String}
     */
    set location(val) {
        this._data.location = val;
    }

    /**
     * @type {?String}
     */
    get featuredSensor() {
        return this._data.featuredSensor || null;
    }

    /**
     * @type {String}
     */
    set featuredSensor(val) {
        this._data.featuredSensor = val;
    }

    /**
     * @type {String[]}
     */
    get tags() {
        return this._data.tags || [];
    }

    /**
     * @type {String[]}
     */
    set tags(val) {
        if (!Array.isArray(val)) {
            throw new TypeError("Tags must be an array!");
        }
        this._data.tags = val;
    }

    /**
     * @type {?String}
     */
    get user() {
        return this._data.user || null;
    }

    /**
     * @type {String}
     */
    set user(val) {
        this._data.user = val;
    }
}

module.exports = Device;
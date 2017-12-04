const Collection = require("./collection.js");

/**
 * @class Util
 * @static
 */
class Util {

    constructor() {
        throw new Error(`Can't instantiate abstract class ${this.constructor.name}`);
    }
    /**
    * @callback Util~createDtoEntity
    * @param {Object} data
    */

    /**
     * Create a mapped collection of DTO entities (DTO.uid => DTO)
     * @param {Object[]} dataArray - Array of raw object to map
     * @param {Util~createDtoEntity} createDtoCb - The callback for create entity to map
     * @returns {Collection}
     */
    static createDtoCollection(dataArray, createDtoCb) {
        if (!dataArray) {
            return new Collection();
        }
        return new Collection(dataArray.map(data => {
            var dto = createDtoCb(data);
            return [dto.uid, dto];
        }));
    }

    /**
     * Exports only public r/w properties and variables from entity
     * @param {Object} obj
     * @returns {Object}
     */
    static toRawObject(obj) {
        var data = {};
        Object.keys(obj).forEach(prop => {
            if (prop.startsWith("_")) {
                return;
            }
            data[prop] = obj[prop];
        });
        return data;
    }
}

module.exports = Util;
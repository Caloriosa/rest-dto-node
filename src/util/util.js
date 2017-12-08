/**
 * @class Util
 * @static
 */
class Util {

    constructor() {
        throw new Error(`Can't instantiate abstract class ${this.constructor.name}`);
    }
    /**
    * @callback Util~mapDto
    * @param {Object} data
    */

    /**
     * Exports only public r/w properties and variables from entity
     * @param {Object} obj
     * @returns {Object}
     */
    static toRawObject(obj) {
        var data = {};
        Object.keys(obj).forEach(prop => {
            if (prop.startsWith("_") || obj[prop] === undefined) {
                return;
            }
            if (typeof(obj[prop]) === "object" && !Array.isArray(obj)) {
                data[prop] = Util.toRawObject(obj[prop]);
            }
            data[prop] = obj[prop];
        });
        return data;
    }

    /**
     * Create copy of an instance
     * @param {Object} obj 
     */
    static cloneObject(obj) {
        return Object.assign(Object.create(obj), obj);
    }

    /**
     * Sets default properties on an object that aren't already specified.
     * @param {Object} def Default properties
     * @param {Object} given Object to assign defaults to
     * @returns {Object}
     */
    static mergeDefault(def, given) {
        if (!given) return def;
        for (const key in def) {
            if (!{}.hasOwnProperty.call(given, key)) {
                given[key] = def[key];
            } else if (given[key] === Object(given[key])) {
                given[key] = this.mergeDefault(def[key], given[key]);
            }
        }
        return given;
    }

    /**
     * Process promise with auto-catch error.
     * Result includes a resolved content and catched error.
     * @param {Promise} promise 
     * @returns {Promise<ResultSet<Error,*>>}
     */
    static saferize(promise) {  
        return promise.then(data => {
           return [null, data];
        })
        .catch(err => [err]);
    }
}

module.exports = Util;
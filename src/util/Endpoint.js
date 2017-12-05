/**
 * @class
 */
class Endpoint {
    /**
     * 
     * @param {string} path 
     * @param {Object} [pathArgs]
     * @constructor
     */
    constructor(path, pathArgs = null) {
        /**
         * @type {string}
         * @private
         */
        this._path = path;
        /**
         * @type {Object}
         * @private
         */
        this._pathArgs = pathArgs
    }
    
    /**
     * @returns {string}
     */
    get path() {
        return this._path;
    }

    /**
     * @returns {Object}
     */
    get pathArgs() {
        return this._pathArgs;
    }

    /**
     * @returns {string}
     */
    escapePath(){
        var result = this.path;
        if (!this.pathArgs) {
            return this.path;
        }
        for (var placeholder in this.pathArgs){
            var regex = new RegExp("\\$\\{" + placeholder + "\\}","i");
            result = result.replace(regex, this.pathArgs[placeholder]);
        }
        return result;
    }
}

module.exports = Endpoint;
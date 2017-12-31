const Util = require('../util/util')
const urljoin = require('url-join')

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
  constructor (path, pathArgs = null) {
    /**
         * @type {string}
         * @private
         */
    this._path = path
    /**
         * @type {Object}
         * @private
         */
    this._pathArgs = pathArgs
  }

  /**
     * @returns {string}
     */
  get path () {
    return this._path
  }

  /**
     * @returns {Object}
     */
  get pathArgs () {
    return this._pathArgs
  }

  /**
     * @param {Endpoint} endpoint
     * @returns {Endpoint}
     */
  join (endpoint) {
    return new Endpoint(urljoin(this.escapePath(), endpoint.path), endpoint.pathArgs)
  }

  /**
     * @param {String} subpath
     * @param {Object} subPathArgs
     * @returns {Endpoint}
     */
  ext (subpath, subPathArgs) {
    return this.join(new Endpoint(subpath, subPathArgs))
  }

  /**
     * @param {Endpoint} endpoint
     * @returns {Endpoint}
     */
  merge (endpoint) {
    const path = urljoin(this.path, endpoint.path)
    const pathArgs = Util.mergeDefault(this.pathArgs, endpoint.pathArgs)
    return new Endpoint(path, pathArgs)
  }

  /**
     * @returns {string}
     */
  escapePath () {
    let result = this.path
    if (!this.pathArgs) {
      return this.path
    }
    for (const placeholder in this.pathArgs) {
      const regex = new RegExp(`\\$\\{${placeholder}\\}`, 'gi')
      result = result.replace(regex, this.pathArgs[placeholder])
    }
    return result
  }
}

module.exports = Endpoint

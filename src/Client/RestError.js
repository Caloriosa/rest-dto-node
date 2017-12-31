/**
 * @class
 * @extends {Error}
 */
class RestError extends Error {
  /**
     * @constructor
     * @param {String} message
     * @param {Object} error
     */
  constructor (message, error) {
    super(message)
    this.name = RestError.name
    this.status = error.response ? error.response.status : error.errno
    this.code = error.code || `ERR_HTTP_${this.status}`
    this.url = error.config.url
    this.method = error.config.method
    this.parent = error
  }

  get response () {
    return this.parent.response || null
  }

  get request () {
    return this.parent.response || null
  }
}

module.exports = RestError

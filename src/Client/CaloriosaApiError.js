const RestError = require("./RestError.js");

/**
 * @class
 * @extends Error
 */
class CaloriosaApiError extends RestError {
  /**
   * @constructor
   * @param {string} message 
   * @param {StatusData} status
   */
  constructor(message, restResult) {
    super(message, restResult.meta.response);
    /**
     * @type {StatusData}
     */
    this.status = restResult.meta.status;
    /**
     * @type {DtoData}
     */
    this.content = restResult.content;
  }
}

module.exports= CaloriosaApiError;

/**
 * @class
 * @extends Error
 */
class CaloriosaApiError extends Error {
  /**
   * @constructor
   * @param {string} message 
   * @param {StatusData} status
   */
  constructor(message, restResult) {
    super(message);
    /**
     * @type {StatusData}
     */
    this.status = restResult.meta.status;
    /**
     * @type {Response}
     */
    this.response = restResult.meta.response;
    /**
     * @type {DtoData}
     */
    this.content = RestResult.content;
  }
}

module.exports= CaloriosaApiError;
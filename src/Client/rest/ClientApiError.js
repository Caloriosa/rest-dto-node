
/**
 * @class
 * @extends Error
 */
class ClientApiError extends Error {
  /**
   * @constructor
   * @param {string} message 
   * @param {StatusData} status
   */
  constructor(message, status = null, content = null) {
    super(message);
    /**
     * @type {StatusData}
     */
    this.status = status;
    /**
     * @type {DtoData}
     */
    this.content = content;
  }
}

module.exports= ClientApiError;
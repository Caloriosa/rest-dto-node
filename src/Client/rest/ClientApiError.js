
/**
 * @class
 * @extends Error
 */
class ClientApiError extends Error {
  /**
   * @constructor
   * @param {string} message 
   * @param {Object} status
   */
  constructor(message, status = null) {
    super(message);
    this.status = status;
    this.content = null;
  }
}

module.exports= ClientApiError;
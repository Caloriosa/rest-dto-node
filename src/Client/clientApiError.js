
/**
 * @class
 * @extends Error
 */
class ClientApiError extends Error {
  /**
   * @constructor
   * @param {string} message 
   * @param {string} errCode 
   * @param {number} httpCode 
   */
  constructor(message, errCode, httpCode) {
    super(errCode + ": " + message);
    this.errCode = errCode;
    this.httpCode = httpCode;
    this.rawMessage = message;
    this.content = null;
  }
}

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
  constructor(httpStatusCode, message, apiStatusCode = null) {
    super((apiStatusCode ? apiStatusCode : "HTTP_" + httpStatusCode) + ": " + message);
    this.apiStatusCode = apiStatusCode;
    this.httpStatusCode = httpStatusCode;
    this.rawMessage = message;
    this.content = null;
  }
}

module.exports= ClientApiError;
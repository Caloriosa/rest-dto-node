/**
 * @class
 * @abstract
 * @desc Base of datasource manager
 */
class AbstractManager {
  /**
   * @constructor
   * @param {String} url 
   * @param {*} rest 
   */
  constructor(url, rest) {
    this.url = url;
    this.rest = rest;
  }

  handleError(error) {

  }
}

module.exports = AbstractManager;
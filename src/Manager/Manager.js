const Util = require("../util/util.js");

/**
 * @class
 * @abstract
 * @desc Abstract DTO manager
 */
class Manager {
  /**
   * @constructor
   * @param {string} url 
   * @param {Client} client
   */
  constructor(client) {
    /**
     * @type {Client}
     * @private
     */
    this._client = client;
  }

  get client() {
    return this._client;
  }

  get rest() {
    return this.client.rest;
  }

  /**
   * 
   * @param {DtoData} dataArray 
   * @param {Util~createDtoEntity} createDtoCb 
   * @returns {Collection<DTO>}
   * @private
   */
  createDtoCollection(dataArray, createDto) {
    return Util.createDtoCollection(dataArray, createDtoCb);
  }
}

module.exports = Manager;
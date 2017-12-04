const AbstractDto = require("../DTO/abstractDto.js");
const Collection = require("../util/collection.js");
const Util = require("../util/util.js");

/**
 * @class
 * @abstract
 * @desc Base of data store
 */
class AbstractStore {
  /**
   * @constructor
   * @param {string} url 
   * @param {RestClient} rest 
   */
  constructor(rest) {
    /**
     * @type {RestClient}
     */
    this.rest = rest;
  }

  createDtoCollection(dataArray, createDto) {
    return Util.createDtoCollection(dataArray, createDto);
  }
}

module.exports = AbstractStore;
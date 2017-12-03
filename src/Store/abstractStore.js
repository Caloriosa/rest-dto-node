const AbstractDto = require("../DTO/abstractDto.js");
const Collection = require("../util/collection.js");

/**
 * @class
 * @abstract
 * @desc Base of data store
 */
class AbstractStore {

  /**
   * @callback AbstractStore~createDto
   * @param {Object} data
   * @returns {AbstractDto}
   */

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

  /**
   * 
   * @param {Object[]} dataArray 
   * @param {AbstractStore~createDto} createDto 
   */
  createCollection(dataArray, createDto) {
    if (!dataArray) {
      return new Collection();
    }
    return new Collection(dataArray.map(data => {
      var dto = createDto(data);
      return [dto.uid, dto];
    }));
  }
}

module.exports = AbstractStore;
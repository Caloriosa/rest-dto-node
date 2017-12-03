const AbstractDto = require("../DTO/abstractDto.js");
const Collection = require("../util/collection.js");

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
    return new Collection(dataArray.map(data => {
      var dto = createDto(data);
      return [dto.uid, dto];
    }));
  }
}

module.exports = AbstractStore;
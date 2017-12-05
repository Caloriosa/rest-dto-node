const Util = require("../util/util.js");

/**
 * @class
 * @abstract
 */
class Entity {
  /**
   * 
   * @param {DtoData} data 
   * @constructor
   */
  constructor(data = {}) {
    /**
     * @private
     */
    this._data = data;
  }

  /**
   * @type {Object}
   * @readonly
   */
  get data() {
    return this._data;
  }

  /**
   * @type {String}
   * @readonly
   */
  get uid() {
    return this.data._id || null;
  }

  /**
   * @type {Date}
   * @readonly
   */
  get createdAt() {
    if (!this.data._created) {
      return null;
    }
    return new Date(this.data._created);
  }

  /**
   * @type {Date}
   * @readonly
   */
  get modifiedAt() {
    if (!this.data._modified) {
      return null;
    }
    return new Date(this.data._modified);
  }

  /**
   * @desc Convert DTO to JSON
   * @param {*} replacer JSON replacer
   * @param {*} space JSON space (pretty output)
   */
  toString(replacer = null, space = null) {
    return JSON.stringify(this.raw(), replacer, space);
  }

  /**
   * @returns {DtoData}
   */
  raw() {
    return Util.toRawObject(this);
  }

  refer(entity, referTo = null, referBy = "uid") {
    if (!referTo) {
      referTo = entity.constructor.nametoLowerCase();
    }
    this[referTo] = entity[uid];
  }
}

module.exports = Entity;
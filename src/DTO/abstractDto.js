/**
 * @class
 * @abstract
 * 
 */
class AbstractDto {
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
   * @desc Convert DTO to JSON
   * @param {*} replacer JSON replacer
   * @param {*} space JSON space (pretty output)
   */
  toJson(replacer = null, space = null) {
    return JSON.stringify(this, replacer, space);
  }
}

module.exports = AbstractDto;
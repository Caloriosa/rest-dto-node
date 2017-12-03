/**
 * @class
 * @abstract
 * 
 */
class AbstractDto {
  constructor(data) {
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
    return this.data.uid || null;
  }
}

module.exports = AbstractDto;
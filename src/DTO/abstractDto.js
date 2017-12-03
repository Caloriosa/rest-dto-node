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
   * @type {String}
   * @readonly
   */
  get uid() {
    return this._data.uid || null;
  }
}

module.exports = AbstractDto;
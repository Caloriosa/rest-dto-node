const Entity = require('../DTO/Entity.js')
const typedefs = require('../typedefs.js')

/**
 * @class
 * @extends {Entity}
 */
class Sensor extends Entity {
  /**
     * @type {String}
     */
  get alias () {
    return this._data.alias
  }

  /**
     * @type {String}
     */
  set alias (val) {
    this._data.alias = val
  }

  /**
     * @type {?String}
     */
  get device () {
    return this._data.device || null
  }

  /**
     * @type {String}
     */
  get title () {
    return this._data.title || ''
  }

  /**
     * @type {String}
     */
  set title (val) {
    this._data.title = val
  }

  /**
     * @type {SensorType}
     */
  get type () {
    return this._data.type || ''
  }

  /**
     * @type {SensorType}
     */
  set type (val) {
    this._data.type = val
  }

  /**
     * @type {String}
     */
  get description () {
    return this._data.description || ''
  }

  /**
     * @type {String}
     */
  set description (val) {
    this._data.description = val
  }
}

module.exports = Sensor

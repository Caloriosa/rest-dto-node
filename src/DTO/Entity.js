const MetaInfo = require("../DTO/MetaInfo")
const Util = require("../util/util")

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
  constructor (data = {}, meta = null) {
    /**
     * @private
     */
    this._data = data
    /**
     * @private
     */
    this._meta = meta
  }

  /**
   * @type {Object}
   * @readonly
   */
  get data () {
    return this._data
  }

  /**
   * @type {String}
   * @readonly
   */
  get uid () {
    return this.data._id || null
  }

  /**
   * @type {Date}
   * @readonly
   */
  get createdAt () {
    if (!this.data._created) {
      return null
    }
    return new Date(this.data._created)
  }

  /**
   * @type {Date}
   * @readonly
   */
  get modifiedAt () {
    if (!this.data._modified) {
      return null
    }
    return new Date(this.data._modified)
  }

  /**
   * Get metadata.
   * <warn>Metadata is not mandatory and may not be available!</warn>
   * @type {MetaInfo}
   * @private
   */
  get meta () {
    return this._meta
  }

  /**
   * @desc Convert DTO to JSON
   * @param {*} replacer JSON replacer
   * @param {*} space JSON space (pretty output)
   */
  toString (replacer = null, space = null) {
    return JSON.stringify(this.raw(), replacer, space)
  }

  /**
   * @returns {DtoData}
   */
  raw () {
    return Util.toRawObject(this)
  }

  /**
   *
   * @param {Entity} entity
   * @param {*} referTo
   * @param {*} referBy
   * @protected
   */
  refer (entity, referTo = null, referBy = "uid") {
    if (!referTo) {
      referTo = entity.constructor.nametoLowerCase()
    }
    this[referTo] = entity[referBy]
  }

  /**
   * Check entity contains some payload
   * @returns {boolean}
   */
  hasPayload () {
    return (this._data != null && !Object.keys(this._data).length > 0)
  }

  /**
   * Check entity contains uid, createdAt and modifiedAt
   * @returns {boolean}
   */
  hasBase () {
    return (this.uid && this.createdAt && this.modifiedAt)
  }

  /**
   * Check entity has metadata
   */
  hasMeta () {
    return (this.meta != null && !Object.keys(this.meta).length > 0)
  }

  /**
   * Check entity contains some payload data basement (uid, createdAt and modifiedAt)
   * @returns {boolean}
   */
  isFilled () {
    return (this.hasPayload() && this.hasBase())
  }

  /**
   * Check entity contains some payload data and includes uid, createdAt and modifiedAt
   * @returns {boolean}
   */
  isFullyfilled () {
    return (this.isFilled() && this.hasBase() && this.hasMeta())
  }

  /**
   * Check entity has no payload data and no metadata.
   * Oposite of hasPayload() method
   * @returns {boolean}
   */
  isNew () {
    return !this.hasPayload()
  }

  static recast (E, blob) {
    let meta = blob._meta || {}
    let data = blob._data || {}
    return new E(data, new MetaInfo(meta._status, meta._httpHeaders, meta._httpStatusCode))
  }
}

module.exports = Entity

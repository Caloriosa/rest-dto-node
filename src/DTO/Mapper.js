const Collection = require('../util/collection.js')
const Util = require('../util/util')
const { DtoMappingError } = require('./errors.js')

/**
 * This class maps DtoData to Entities.
 * This class can map RestMeta to MetaInfo as second function.
 * Mapped entities includes MetaInfo if metadata was set on map param.
 * @class Mapper<T>
 */
class Mapper {
  /**
     * Create new mapper with entity template
     * @param {constructor<Entity>} entityType
     */
  constructor (entityType) {
    if (!entityType) {
      throw new DtoMappingError('Entity type for mapping is undefined!')
    }
    /**
         * Entity template
         * @type {constructor<Entity>}
         * @private
         */
    this._entityType = entityType
  }
  /**
     * Map DtoData to Dto Entity.
     * If input is DtoData[] (array) then selected first member to map.
     * If input data is null or undenfined, then method returns null.
     * @param {DtoData} dataToMap
     * @param {MetaInfo} [meta]
     * @returns {?Entity}
     */
  mapEntity (dataToMap, meta = null) {
    if (Array.isArray(dataToMap)) {
      dataToMap = dataToMap.length ? dataToMap[0] : null
    }
    if (dataToMap && dataToMap.data) {
      dataToMap = dataToMap.data // Remap entity
    }
    return dataToMap ? new this._entityType(dataToMap, meta) : null
  }

  /**
     * Map DtoData[] (array) to a collection of etities.
     * If input data is null or undenfined, then method returns null.
     * @param {DtoData[]} dataArray
     * @param {MetaInfo} [meta]
     * @returns {?Collection<Entity>}
     */
  mapCollection (dataArray, meta = null) {
    if (!dataArray) {
      dataArray = []
    }
    if (!Array.isArray(dataArray)) {
      throw new DtoMappingError('DTO data is not array!')
    }
    return new Collection(dataArray.map(data => {
      const entity = this.mapEntity(data, meta)
      return [entity.uid, entity]
    }), meta)
  }

  /**
     * Map DtoData[] (array) to array of entity.
     * If input data is null or undenfined, then method returns null.
     * <warn>Metadata is available ONLY in some entity in that array!</warn>
     * <warn>If array is empty, then no metadata included!</warn>
     * @param {DtoData} dataArray
     * @param {MetaInfo} [meta]
     * @returns {?Entity[]}
     */
  mapArray (dataArray, meta = null) {
    if (!dataArray) {
      dataArray = []
    }
    if (!Array.isArray(dataArray)) {
      throw new DtoMappingError('DTO data is not array!')
    }
    return dataArray.map(data => this.mapEntity(data, meta))
  }

  static demap (obj) {
    if (!obj) {
      throw new ReferenceError("Demapping object can't be set null or undefined!")
    }
    if (obj.data) {
      return Util.toRawObject(obj.data)
    }
    return Util.toRawObject(obj)
  }

  static demapMerge (obj, addin) {
    if (!addin) {
      throw new ReferenceError("Addin object can't be set null or undefined!")
    }
    return Util.mergeDefault(Mapper.demap(obj), addin)
  }

  get entityTemplate () {
    return this._entityType
  }
}

module.exports = Mapper

/**
 * @callback Mapper~entityFactory
 * @param {DtoData} dtoData
 */

const Collection = require("../util/collection.js");
const MetaInfo = require("./MetaInfo.js");
const { DtoMappingError } = require("./errors.js");

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
            throw new DtoMappingError("Entity type for mapping is undefined!");
        }
        /**
         * Entity template
         * @type {constructor<Entity>}
         * @private
         */
        this._entityType = entityType;
    }
    /**
     * Map DtoData to Dto Entity. 
     * If input is DtoData[] (array) then selected first member to map.
     * If input data is null or undenfined, then method returns null.
     * @param {DtoData} dataToMap
     * @param {RestMeta|MetaInfo} [meta]
     * @returns {?Entity}
     */
    mapEntity(dataToMap, meta = null) {
        if (!dataToMap) {
            return null;
        }
        if (Array.isArray(dataToMap)) {
            throw new DtoMappingError("DTO data can't be array!");
        }
        if (dataToMap.data) {
            dataToMap = dataToMap.data; // Remap entity
        }
        return new this._entityType(dataToMap, this.mapMeta(meta));
    }

    /**
     * Map DtoData[] (array) to a collection of etities.
     * If input data is null or undenfined, then method returns null.
     * @param {DtoData[]} dataArray 
     * @param {RestMeta|MetaInfo} [meta]
     * @returns {?Collection<Entity>}
     */
    mapCollection(dataArray, meta = null) {
        if (!dataArray) {
            return null
        }
        if (!Array.isArray(dataArray)) {
            throw new DtoMappingError("DTO data is not array!");
        }
        meta = this.mapMeta(meta);
        return new Collection(dataArray.map(data => {
            var entity = this.mapEntity(data, meta);
            return [entity.uid, entity];
        }), meta);
    }

    /**
     * Map DtoData[] (array) to array of entity.
     * If input data is null or undenfined, then method returns null.
     * <warn>Metadata is available ONLY in some entity in that array!</warn>
     * <warn>If array is empty, then no metadata included!</warn>
     * @param {DtoData} dataArray 
     * @param {RestMeta|MetaInfo} [meta]
     * @returns {?Entity[]}
     */
    mapArray(dataArray, meta = null) {
        if (!dataArray) {
            return null;
        }
        if (!Array.isArray(dataArray)) {
            throw new DtoMappingError("DTO data is not array!");
        }
        meta = this.mapMeta(meta);
        return dataArray.map(data => {
            return this.mapEntity(data, meta);
        });
    }

    /**
     * 
     * @param {RestMeta|MetaInfo} restMeta 
     * @returns {?MetaInfo}
     */
    mapMeta(restMeta) {
        if (!restMeta) {
            return null;
        }
        if (Array.isArray(restMeta)) {
            throw new DtoMappingError("MetaInfo can't be array!");
        }
        if (restMeta.constructor.name == "MetaInfo") {
            return restMeta;
        }
        return new MetaInfo(restMeta.status, restMeta.response);
    }

    get entityTemplate() {
        return this._entityType;
    }
}

module.exports = Mapper;

/**
 * @callback Mapper~entityFactory
 * @param {DtoData} dtoData
 */
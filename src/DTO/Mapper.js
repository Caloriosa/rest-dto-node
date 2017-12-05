const Collection = require("../util/collection.js");

/**
 * @class Mapper<T>
 */
class Mapper {
    /**
     * 
     * @param {*} entityFactoryCb 
     */
    constructor (entityFactoryCb) {
        if (typeof entityFactoryCb != "function") {
            throw new Error("Entity factory callback is not a function!");
        }
        this.entityFactoryCb = entityFactoryCb;
    }
    /**
     * Map DtoData to Dto Entity. 
     * If input is DtoData[] (array) then selected first member to map
     * @param {DtoData} dataToMap
     * @returns {Entity}
     */
    mapEntity(dataToMap) {
        if (Array.isArray(dataToMap)) {
            dataToMap = dataToMap.shift() || null;
        }
        if (!dataToMap) {
            throw new ReferenceError("Input data to map() can't be null!");
        }
        if (dataToMap.data) {
            dataToMap = dataToMap.data; // Remap entity
        }
        return this.entityFactoryCb(dataToMap);
    }

    /**
     * Map DtoData[] (array) to a collection of etities
     * @param {DtoData[]} dataArray 
     * @returns {Collection<Entity>}
     */
    mapCollection(dataArray) {
        if (!dataArray) {
            return new Collection();
        }
        if (!Array.isArray(dataArray)) {
            throw new TypeError("DTO data is not array!");
        }
        return new Collection(dataArray.map(data => {
            var entity = this.mapEntity(data);
            return [entity.uid, entity];
        }));
    }

    /**
     * Map DtoData[] (array) to array of entities
     * @param {DtoData} dataArray 
     * @returns {Entity[]}
     */
    mapArray(dataArray) {
        if (!dataArray) {
            return [];
        }
        if (!Array.isArray(dataArray)) {
            throw new TypeError("DTO data is not array!");
        }
        return dataArray.map(data => {
            return this.mapEntity(data);
        });
    }
}

module.exports = Mapper;

/**
 * @callback Mapper~entityFactory
 * @param {DtoData} dtoData
 */
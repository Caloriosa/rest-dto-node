const Endpoint = require("../util/Endpoint.js");
const Entity = require("../DTO/Entity.js");

/**
 * @class
 * @abstract
 * @desc Abstract DTO manager
 */
class Manager {
  /**
   * @constructor
   * @param {Mapper} mapper
   * @param {RestClient} restClient
   */
  constructor(mapper, restClient) {
    /**
     * @type {Mapper}
     * @private
     */
    this._mapper = mapper;
    /**
     * @type {RestClient}
     * @private
     */
    this._rest = restClient;

    /**
     * REST Client calling args
     * @type {Object}
     */
    this.rcArgs = {};
  }

  /**
   * @type {Mapper}
   */
  get mapper() {
    return this._mapper;
  }

  /**
   * @type {RestClient}
   * @readonly
   */
  get rest() {
    return this._rest;
  }
 
  /**
   * Fetch an array of entities
   * @param {Endpoint} endpoint REST Endpoint (path, path args)
   * @param {Entity|DtoData} entity Entity or DTO data
   * @param {QueryObject} query Parameters for querying REST call
   * @param {*} rcArgs Additional arguments for REST exec method
   * @returns {Promise<ResultSet<Entity[], MetaInfo>>}
   */
  async fetchArray(endpoint, query = null, rcArgs = null) {
    let [ dtoData, restMeta ] = await this.rest.get(endpoint.escapePath(), query, rcArgs || this.rcArgs);
    return [ this.mapper.mapArray(dtoData), this._mapper.mapMeta(restMeta) ];
  }

  /**
   * Fetch a collection of entities (GET)
   * @param {Endpoint} endpoint REST Endpoint (path, path args)
   * @param {QueryObject} query Parameters for querying REST call
   * @param {*} rcArgs Additional arguments for REST exec method
   * @returns {Promise<ResultSet<Collection<string, Entity>, MetaInfo>>}
   */
  async fetchCollection(endpoint, query = null, rcArgs = null) {
    let [ dtoData, restMeta ] = await this.rest.get(endpoint.escapePath(), query, rcArgs || this.rcArgs);
    return [ this.mapper.mapCollection(dtoData), this._mapper.mapMeta(restMeta) ];
  }

  /**
   * Fetch a single entity (GET)
   * @param {Endpoint} endpoint REST Endpoint (path, path args)
   * @param {QueryObject} query Parameters for querying REST call
   * @param {*} rcArgs Additional arguments for REST exec method
   * @returns {Promise<ResultSet<Entity,MetaInfo>>}
   */
  async fetchEntity(endpoint, query = null, rcArgs = null) {
    let [ dtoData, restMeta ] = await this.rest.get(endpoint.escapePath(), query, rcArgs || this.rcArgs);
    return [ this.mapper.mapEntity(dtoData), this._mapper.mapMeta(restMeta) ];
  }

  /**
   * Push new entity (CREATE)
   * @param {Endpoint} endpoint REST Endpoint (path, path args)
   * @param {Entity|DtoData} entity Entity or DTO data
   * @param {QueryObject} query Parameters for querying REST call
   * @param {*} rcArgs Additional arguments for REST exec method
   * @returns {Promise<ResultSet<Entity, MetaInfo>>}
   */
  async pushEntity(endpoint, entity, query = null, rcArgs = null) {
    let [ dtoData, restMeta ] = await this.rest.post(endpoint.escapePath(), entity, query, rcArgs || this.rcArgs);
    return [ this.mapper.mapEntity(dtoData), this._mapper.mapMeta(restMeta) ];
  }

  /**
   * Patch update entity (PATCH)
   * @param {Endpoint} endpoint REST Endpoint (path, path args)
   * @param {Entity|DtoData} entity Entity or DTO data
   * @param {QueryObject} query Parameters for querying REST call
   * @param {*} rcArgs Additional arguments for REST exec method
   * @returns {Promise<ResultSet<Entity,MetaInfo>>}
   */
  async patchEntity(endpoint, entity, query = null, rcArgs = null) {
    let [ dtoData, restMeta ] = await this.rest.patch(endpoint.escapePath(), entity, query, rcArgs || this.rcArgs);
    return [ this.mapper.mapEntity(dtoData), this._mapper.mapMeta(restMeta) ];
  }

  /**
   * Replace update entity (PUT)
   * @param {Endpoint} endpoint REST Endpoint (path, path args)
   * @param {Entity|DtoData} entity Entity or DTO data
   * @param {QueryObject} query Parameters for querying REST call
   * @param {*} rcArgs Additional arguments for REST exec method
   * @returns {Promise<ResultSet<Entity,MetaInfo>>}
   */
  async replaceEntity(endpoint, entity, query = null, rcArgs = null) {
    let [ dtoData, restMeta ] = await this.rest.put(endpoint.escapePath(), entity, query, rcArgs || this.rcArgs);
    return [ this.mapper.mapEntity(dtoData), this._mapper.mapMeta(restMeta) ];
  }
}

module.exports = Manager;

/**
 * @callback Manager~constructEntity
 * @param {DtoData} data
 */
const Endpoint = require("../util/Endpoint.js")
const Entity = require("../DTO/Entity.js")
const Mapper = require("./Mapper.js")
const MetaInfo = require("./MetaInfo.js")
const Client = require("../Client/Client")

/**
 * @class
 * @abstract
 * @desc Abstract DTO manager
 */
class Manager {
  /**
   * @constructor
   * @param {Mapper} mapper
   * @param {Client} client
   */
  constructor (mapper, client) {
    /**
     * @type {Mapper}
     * @private
     */
    this._mapper = mapper
    /**
     * @type {RestClient}
     * @private
     */
    this._client = client
    /**
     * REST Client calling args
     * @type {Object}
     */
    this.rcArgs = {}
  }

  /**
   * @type {Mapper}
   */
  get mapper () {
    return this._mapper
  }

  /**
   * @type {RestClient}
   * @readonly
   */
  get client () {
    return this._client
  }

  /**
   * Fetch an array of entities (GET)
   * @param {Endpoint} endpoint REST Endpoint (path, path args)
   * @param {Entity|DtoData} entity Entity or DTO data
   * @param {QueryObject} query Parameters for querying REST call
   * @param {*} rcArgs Additional arguments for REST exec method
   * @returns {Promise<Entity[]>}
   */
  async fetchArray (endpoint, query = null, rcArgs = null) {
    let d = Manager.resolve(await this.client.get(endpoint.escapePath(), query, rcArgs || this.rcArgs))
    return this.mapper ? this.mapper.mapArray(d.content, d.meta) : d
  }

  /**
   * Fetch a collection of entities (GET)
   * @param {Endpoint} endpoint REST Endpoint (path, path args)
   * @param {QueryObject} query Parameters for querying REST call
   * @param {*} rcArgs Additional arguments for REST exec method
   * @returns {Promise<Collection<string, Entity>>}
   */
  async fetchCollection (endpoint, query = null, rcArgs = null) {
    let d = Manager.resolve(await this.client.get(endpoint.escapePath(), query, rcArgs || this.rcArgs))
    return this.mapper ? this.mapper.mapCollection(d.content, d.meta) : d
  }

  /**
   * Fetch a single entity (GET)
   * @param {Endpoint} endpoint REST Endpoint (path, path args)
   * @param {QueryObject} query Parameters for querying REST call
   * @param {*} rcArgs Additional arguments for REST exec method
   * @returns {Promise<Entity>}
   */
  async fetchEntity (endpoint, query = null, rcArgs = null) {
    let d = Manager.resolve(await this.client.get(endpoint.escapePath(), query, rcArgs || this.rcArgs))
    return this.mapper ? this.mapper.mapEntity(d.content, d.meta) : d
  }

  /**
   * Push new entity (CREATE)
   * @param {Endpoint} endpoint REST Endpoint (path, path args)
   * @param {Entity|DtoData} entity Entity or DTO data
   * @param {QueryObject} query Parameters for querying REST call
   * @param {*} rcArgs Additional arguments for REST exec method
   * @returns {Promise<Entity>}
   */
  async pushEntity (endpoint, entity, query = null, rcArgs = null) {
    if (!entity) {
      throw new ReferenceError("Pushing entity can't be null or undefined!")
    }
    let d = Manager.resolve(await this.client.post(endpoint.escapePath(), Mapper.demap(entity), query, rcArgs || this.rcArgs))
    return this.mapper ? this.mapper.mapEntity(d.content, d.meta) : d
  }

  /**
   * Patch update entity (PATCH)
   * @param {Endpoint} endpoint REST Endpoint (path, path args)
   * @param {Entity|DtoData} entity Entity or DTO data
   * @param {QueryObject} query Parameters for querying REST call
   * @param {*} rcArgs Additional arguments for REST exec method
   * @returns {Promise<Entity,MetaInfo>}
   */
  async patchEntity (endpoint, entity, query = null, rcArgs = null) {
    if (!entity) {
      throw new ReferenceError("Patching entity can't be null or undefined!")
    }
    let d = Manager.resolve(await this.client.patch(endpoint.escapePath(), Mapper.demap(entity), query, rcArgs || this.rcArgs))
    return this.mapper ? this.mapper.mapEntity(d.content, d.meta) : d
  }

  /**
   * Replace update entity (PUT)
   * @param {Endpoint} endpoint REST Endpoint (path, path args)
   * @param {Entity|DtoData} entity Entity or DTO data
   * @param {QueryObject} query Parameters for querying REST call
   * @param {*} rcArgs Additional arguments for REST exec method
   * @returns {Promise<ResultSet<Entity,MetaInfo>>}
   */
  async replaceEntity (endpoint, entity, query = null, rcArgs = null) {
    if (!entity) {
      throw new ReferenceError("Replacing entity can't be null or undefined!")
    }
    let d = Manager.resolve(await this.client.put(endpoint.escapePath(), Mapper.demap(entity), query, rcArgs || this.rcArgs))
    return this.mapper ? this.mapper.mapEntity(d.content, d.meta) : d
  }

  /**
   *
   * @param {Endopoint} endpoint
   * @param {QueryObject} query
   * @param {*} rcArgs
   */
  async deleteEntity (endpoint, query = null, rcArgs = null) {
    console.dir(this.token)
    let d = Manager.resolve(await this.client.delete(endpoint.escapePath(), query, rcArgs || this.rcArgs))
    return d.meta
  }

  /**
   * @private
   */
  static resolve (res) {
    let { data, response } = res
    return {
      content: data.content || null,
      meta: new MetaInfo(data.status, response.headers, response.status)
    }
  }
}

module.exports = Manager

/**
 * @callback Manager~constructEntity
 * @param {DtoData} data
 */

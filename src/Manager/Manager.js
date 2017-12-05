const Util = require("../util/util.js");
const CleverDto = require("../DTO/CleverDto.js");

/**
 * @class
 * @abstract
 * @desc Abstract DTO manager
 */
class Manager {
  /**
   * @constructor
   * @param {string} url 
   * @param {Client} client
   */
  constructor(client) {
    if (this.constructor.name == Manager.name) {
      throw new Error("Can't instantiate abstract class!");
    }
    /**
     * @type {Client}
     * @private
     */
    this._client = client;
  }

  /**
   * @type {Client}
   * @readonly
   * 
   */
  get client() {
    return this._client;
  }

  /**
   * @type {RestClient}
   * @readonly
   */
  get rest() {
    return this.client.rest;
  }

  /**
   * @type {string}
   * @readonly
   */
  get basePath() {
    throw new Error("Base path can't be undenfinde!");
  }

  /**
   * Create new DTO entity.
   * @param {DtoData} [data={}]
   * @abstract
   */
  createNewEntity(data = {}) {
    throw new Error("Can't call abstract method!");
  }

  /**
   * Map DtoData to Dto Entity
   * @param {DtoData} dtoData
   */
  map(dtoData, constructEntityCb = null) {
    if (!dataToMap) {
      throw new ReferenceError("Input data to map() can't be null!");
    }
    if (dtoData.data) {
      dtoData = dtoData.data; // Remap entity
    }
    return this.createNewEntity(dtoData);
  }

  /**
   * 
   * @param {DtoData} dataArray 
   * @param {Util~mapDto} mapDtoCb 
   * @returns {Collection<DTO>}
   * @private
   */
  createDtoCollection(dataArray, mapDtoCb) {
    return Util.createDtoCollection(dataArray, mapDtoCb);
  }

  /**
   * List records
   * @param {QueryObject} query
   * @returns {Collection<Dto>}
   */
  async list(query = null) {
    let args = {path: {basePath: this.basePath}};
    return this.createDtoCollection(await this.rest.get("${basePath}", query, args), data => this.map(data));
  }

  async get(uid) {
    let args = {path: {basePath: this.basePath, uid: uid}};
    return this.map(this, await this.rest.get("${basePath}/${uid}", query, args));
  }

  /**
   * 
   * @param {User|DtoData} user 
   * @returns {Promise<User>}
   */
  async save(user, uid = null) {
    let args = {path: {basePath: this.basePath}}
    uid = uid || user.uid || null
    if (uid) {
      args.path.uid = uid;
      //TODO: Write method for UPDATE entity
      throw new Error("Update user not implemented yet!");
    }
    return this.map(await this.rest.post("${basePath}", user, args));
  }
}

module.exports = Manager;

/**
 * @callback Manager~constructEntity
 * @param {DtoData} data
 */
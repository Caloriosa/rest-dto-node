const Util = require("../util/util.js");

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

  createDtoEntity() {
    throw new Error("No entity given!");
  }

  /**
   * 
   * @param {DtoData} dataArray 
   * @param {Util~createDtoEntity} createDtoCb 
   * @returns {Collection<DTO>}
   * @private
   */
  createDtoCollection(dataArray, createDtoCb) {
    return Util.createDtoCollection(dataArray, createDtoCb);
  }

  /**
   * List records
   * @param {QueryObject} query
   * @returns {Collection<Dto>}
   */
  async list(query = null) {
    let args = {path: {basePath: this.basePath}};
    return this.createDtoCollection(await this.rest.get("${basePath}", query, args), data => this.createDtoEntity(data));
  }

  async get(uid) {
    let args = {path: {basePath: this.basePath, uid: uid}};
    return this.createDtoEntity(this.client, await this.rest.get("${basePath}/${uid}", query, args));
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
    return this.createDtoEntity(await this.rest.post("${basePath}", user, args));
  }
}

module.exports = Manager;
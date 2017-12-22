const Sensor = require("../Entities/Sensor.js");
const Device = require("../Entities/Device.js");
const Manager = require("../DTO/Manager.js");
const Mapper = require("../DTO/Mapper.js");
const Endpoint = require("../util/Endpoint.js");
const DataResolver = require("../util/DataResolver.js");
const Client = require("../Client/Client");

/**
 * @class
 */
class DeviceSensorService {

  /**
   * 
   * @param {Client} client
   * @param {Device|String} device
   * @param {String} [token]
   * @constructor
   */
  constructor(client, device, token = null) {
    if (!device) {
        throw new ReferenceError("Operation device for sensors can't be set null or undefined!");
    }
    /**
     * @type {String}
     * @private
     */
    this._deviceUid = DataResolver.resolveUid(device);
    /**
     * @type {RestClient}
     * @private
     */
    this._client = client;
    /**
     * @type {Manager}
     * @private
     */
    this._manager = new Manager(new Mapper(Sensor), this._client, token || this._client.token);
  }

  /**
   * Get devices
   * @param {QueryObject} query 
   * @returns {Promise<Collection<Sensor>>}
   */
  fetchSensors(query = null) {
    return this._manager.fetchCollection(new Endpoint("/devices/${device}/sensors", {device: this.deviceUid}), query);
  }

  /**
   * Get one specific device
   * @param {string} uid 
   * @returns {Promise<Sensor>}
   */
  fetchSensor(uid) {
    return this._manager.fetchEntity(new Endpoint("/devices/${device}/sensors/${id}", {device: this.deviceUid, id: uid}));
  }

  /**
   * Udpate a device's sensor or create new
   * Restriction: ADMIN
   * Verification: TOKEN
   * @param {Sensor|DtoData} entity 
   * @param {string} [uid]
   * @returns {Promise<User>}
   */
  setSensor(entity, uid = null) {
    uid = DataResolver.resolveUid(uid || entity);
    if (uid) {
      return this._manager.patchEntity(new Endpoint("/devices/${device}/sensors/${id}", {device: this.deviceUid, id: uid}), entity);
    }
    return this._manager.pushEntity(new Endpoint("/devices/${device}/sensors", {device: this.deviceUid}), entity);
  }

  get deviceUid() {
    return this._deviceUid;
  }
}

module.exports = DeviceSensorService;
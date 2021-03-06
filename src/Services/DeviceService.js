const Device = require("../Entities/Device.js")
const Manager = require("../DTO/Manager.js")
const Mapper = require("../DTO/Mapper.js")
const Endpoint = require("../util/Endpoint.js")
const DataResolver = require("../util/DataResolver.js")
const DeviceSensorService = require("./DeviceSensorService")
const typedefs = require("../typedefs.js")

/**
 * @class
 */
class DeviceService {
  /**
   *
   * @param {Client} client
   * @param {string} [token]
   * @constructor
   */
  constructor (client) {
    /**
     * @type {RestClient}
     * @private
     */
    this._client = client
    /**
     * @type {Manager}
     * @private
     */
    this._manager = new Manager(new Mapper(Device), this._client)
  }

  /**
   * Get devices
   * @param {QueryObject} query
   * @returns {Promise<Collection<Device>>}
   */
  fetchDevices (query = null) {
    return this._manager.fetchCollection(new Endpoint("/devices"), query)
  }

  /**
   * Get one specific device
   * @param {string} uid
   * @returns {Promise<Device>}
   */
  fetchDevice (uid) {
    return this._manager.fetchEntity(new Endpoint("/devices/${id}", { id: uid }))
  }

  /**
   *
   * @param {String} deviceName
   * @returns {Promise<Device>}
   */
  fetchDeviceByName (deviceName) {
    if (!deviceName) {
      throw new ReferenceError("Device name can't be null or undefined!")
    }
    return this._manager.fetchEntity(new Endpoint("/devices"), {
      filter: {
        name: deviceName
      }
    })
  }

  /**
   * Fetch devices owned by currently logged user
   * Restriction: MEMBER, ADMIN
   * Verification: TOKEN
   * @returns {Promise<Device>}
   */
  fetchMyDevices (query = null) {
    return this._manager.fetchCollection(new Endpoint("/devices/my"), query)
  }

  /**
   * Fetch currently logged device (Only DEVICE)
   * Restriction: DEVICE
   * Verification: TOKEN
   */
  fetchMe () {
    return this._manager.fetchEntity(new Endpoint("/devices/me"))
  }

  /**
   * Update currently loged device information (Only DEVICE)
   * Restriction: DEVICE
   * Verification: TOKEN
   * @param {Device|DtoData} device
   */
  setMe (device) {
    return this._manager.patchEntity(new Endpoint("/devices/me"), device)
  }

  /**
   * Udpate a device or create new
   * Restriction: ADMIN
   * Verification: TOKEN
   * @param {User|DtoData} entity
   * @param {string} [uid]
   * @returns {Promise<User>}
   */
  setDevice (entity, uid = null) {
    uid = DataResolver.resolveUid(uid || entity)
    if (uid) {
      return this._manager.patchEntity(new Endpoint("/devices/${id}", { id: uid }), entity)
    }
    return this._manager.pushEntity(new Endpoint("/devices"), entity)
  }

  /**
   * Operate with device's sensors
   * @param {Device|String} device
   * @returns {DeviceSensorService}
   */
  sensors (device) {
    return new DeviceSensorService(this._client, device)
  }
}

module.exports = DeviceService

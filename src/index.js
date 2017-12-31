const Util = require('./util/util.js')
const API = require('./Client/API.js')
const typedefs = require('./typedefs.js')

module.exports = {
  // Main classes
  Client: require('./Client/Client.js'),
  CaloriosaApiError: require('./Client/CaloriosaApiError.js'),
  RestError: require('./Client/RestError.js'),
  API,

  // DTO
  Entity: require('./DTO/Entity.js'),
  Mapper: require('./DTO/Mapper.js'),
  Manager: require('./DTO/Manager.js'),
  MetaInfo: require('./DTO/MetaInfo.js'),

  // Entites
  User: require('./Entities/User.js'),
  AuthInfo: require('./Entities/AuthInfo.js'),
  Device: require('./Entities/Device'),
  Sensor: require('./Entities/Sensor.js'),

  // Services
  UserService: require('./Services/UserService.js'),
  AuthService: require('./Services/AuthService.js'),
  DeviceService: require('./Services/DeviceService.js'),
  DeviceSensorService: require('./Services/DeviceSensorService.js'),

  // Utilities
  Collection: require('./util/collection.js'),
  DataResolver: require('./util/DataResolver.js'),
  Endpoint: require('./util/Endpoint.js'),
  typedefs,
  Util,
  util: Util,

  // Shortcuts
  saferize: Util.saferize,
  ApiStatuses: typedefs.ApiStatuses,
  UserRoles: typedefs.UserRoles,
  SensorTypes: typedefs.SensorTypes,
  IdentityTypes: typedefs.IdentityTypes,
  createApiClient: API.createApiClient
}

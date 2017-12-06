/**
 * @typedef {Object} UserRole
 * 
 * @property {String} [ADMIN=admin]
 * @property {String} [MEMBER=member]
 * @property {String} [UNKNOWN=unknown]
 */
exports.UserRoles = {
  ADMIN: "admin",
  MEMBER: "member",
  UNKNOWN: "unknown"
};

/**
 * @typedef HttpProxy
 * 
 * @property {String} [host=localhost]
 * @property {Number} [port=8080]
 * @property {String} [user=proxyuser]
 * @property {String} [password]
 * @property {Boolean} [tunnel=true]
 */
exports.DefaultHttpProxy = {
  host: "localhost",
  port: 8080,
  user: "proxyuser",
  password: "",
  tunnel: true
};

/**
 * @typedef {Object} ClientOptions
 * 
 * @property {String} [url=http://localhost:6060]
 * @property {String} [token=null]
 * @property {HttpProxy} [proxy=null]
 */
exports.DefaultClientOptions = {
    url: "http://10.0.0.143:8080",
    token: null,
    proxy: null,
};

/**
 * @typedef {Object} AuthInfo
 * 
 * @property {string} token
 * @property {string} created
 * @property {string} expires
 */

/**
 * @typedef {Object} QueryObject
 */

/**
 * @typedef {Object} DtoData
 */

/**
 * @typedef {Dto|DtoData|String} UidResolvable
 */

/**
 * @typedef {Array} ResultSet
 * 
 * Multiple results from a function mapped as array
 * 
 * @example  
 * // Returns ResultSet<Entity, HttpStatus>
 * function foo() {
 *   // ... do something
 *   return [x, y];
 * }
 */

/**
 * @typedef {string} ApiError
 * 
 * * OK
 * * DUPLICATED
 * * NOT_FOUND
 * * DATASOURCE_ERROR
 * * PERMISSION_DENIED
 * * UNAUTHORIZED
 * * UNAVAILABLE
 * * REMOVE_FAILED
 * * AUTH_FAILED
 * * INVALID_DATA
 * * INVALID_CREDENTIALS
 * * INVALID_SENSOR
 * * INVALID_TOKEN
 * * TOKEN_EXPIRED
 * * USER_EXISTS
 * * WEAK_PASSWORD
 * * INVALID_PASSWORD
 * * INVALID_USERNAME
 * * INVALID_EMAIL
 * * PASSWORD_MISMATCH
 * * ACTIVATION_FAILED
 * * DATA_INCOMPLETE
 * * METHOD_NOT_ALLOWED
 * * NOT_IMPLEMENTED
 * * TIMED_OUT
 * * SERVICE_UNAVAILABLE
 * * BUSY
 * * UNKNOWN
 */
exports.ApiErrors = {
  OK: "OK",
  DUPLICATED: "DUPLICATED",
  NOT_FOUND: "NOT_FOUND",
  DATASOURCE_ERROR: "DATASOURCE_ERROR",
  PERMISSION_DENIED: "PERMISSION_DENIED",
  UNAUTHORIZED: "UNAUTHORIZED",
  UNAVAILABLE: "UNAVAILABLE",
  REMOVE_FAILED: "REMOVE_FAILED",
  AUTH_FAILED: "AUTH_FAILED",
  INVALID_DATA: "INVALID_DATA",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  INVALID_SENSOR: "INVALID_SENSOR",
  INVALID_TOKEN: "INVALID_TOKEN",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  USER_EXISTS: "USER_EXISTS",
  WEAK_PASSWORD: "WEAK_PASSWORD",
  INVALID_PASSWORD: "INVALID_PASSWORD",
  INVALID_USERNAME: "INVALID_USERNAME",
  INVALID_EMAIL: "INVALID_EMAIL",
  PASSWORD_MISMATCH: "PASSWORD_MISMATCH",
  ACTIVATION_FAILED: "ACTIVATION_FAILED",
  DATA_INCOMPLETE: "DATA_INCOMPLETE",
  METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED",
  NOT_IMPLEMENTED: "NOT_IMPLEMENTED",
  TIMED_OUT: "TIMED_OUT",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
  BUSY: "BUSY",
  UNKNOWN: "UNKNOWN"
};
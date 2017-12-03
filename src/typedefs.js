/**
 * @typedef {Object} UserRole
 * 
 * @property {String} [ADMIN=admin]
 * @property {String} [MEMBER=member]
 * @property {String} [UNKNOWN=unknown]
 */
exports.UserRole = {
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
exports.HttpProxy = {
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
exports.ClientOptions = {
    url: "http://localhost:6060",
    token: null,
    proxy: null,
};
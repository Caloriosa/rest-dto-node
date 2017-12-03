const AbstractDto = require("./abstractDto.js");
const UserRole = require("../typedefs.js").UserRole;

/**
 * @class
 * @extends AbstractDto
 */
class User extends AbstractDto {

  constructor(data = {}) {
    super(data);
    
    /**
    * @type {String}
    */
    this.login = data.login || null;

    /**
     * @type {String}
     */
    this.password = data.password || null;

    /**
     * @type {String}
     */
    this.email = data.email || "";

    /**
     * @type {String}
     */
    this.name = data.name || "";

    /**
     * @type {Boolean}
     */
    this.activated = data.activated || false;

    /**
     * @type {UserRole}
     */
    this.role = data.role || UserRole.MEMBER;
  }

  /**
   * @type {Date}
   * @readonly
   */
  get createdAt() {
    if (!this.data.createdAt) {
      return null;
    }
    return new Date(this._data.createdAt);
  }

  /**
   * @desc Check if user is in admin role
   * @returns {Boolean}
   */
  isAdmin() {
    return this.role === UserRole.ADMIN;
  }

  /**
   * @desc Check if user is in member role
   * @returns {Boolean}
   */
  isMember() {
    return this.role === UserRole.MEMBER;
  }

}

module.exports = User;
const CleverDto = require("./CleverDto.js");
const UserRoles = require("../typedefs.js").UserRoles;

/**
 * @class
 * @extends {CleverDto}
 */
class User extends CleverDto {

  /**
   * 
   * @param {UserManager} manager 
   * @param {DtoData} data 
   * @constructor
   */
  constructor(manager, data = {}) {
    super(manager, data);
    
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
    this.role = data.role || UserRoles.MEMBER;
  }

  /**
   * @desc Check if user is in admin role
   * @returns {Boolean}
   */
  isAdmin() {
    return this.role === UserRoles.ADMIN;
  }

  /**
   * @desc Check if user is in member role
   * @returns {Boolean}
   */
  isMember() {
    return this.role === UserRoles.MEMBER;
  }

}

module.exports = User;
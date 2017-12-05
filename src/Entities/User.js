const Entity = require("../DTO/Entity.js");
const UserRoles = require("../typedefs.js").UserRoles;

/**
 * @class
 * @extends {Entity}
 */
class User extends Entity {

  /**
   * 
   * @param {DtoData} data 
   * @constructor
   */
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

  static precreate(login, password, email) {
    return new User({login: login, password: password, email: email});
  }

}

module.exports = User;
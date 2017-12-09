const Entity = require("../DTO/Entity.js");
const UserRoles = require("../typedefs.js").UserRoles;

/**
 * @class
 * @extends {Entity}
 */
class User extends Entity {

  refill() {
    /**
    * @type {String}
    */
    this.login = this._data.login || null;
    
    /**
     * @type {String}
     */
    this.password = this._data.password || null;
    
    /**
     * @type {String}
     */
    this.email = this._data.email || "";
    
    /**
     * @type {String}
     */
    this.name = this._data.name || "";
    
    /**
     * @type {Boolean}
     */
    this.activated = this._data.activated || false;
    
    /**
     * @type {UserRole}
     */
    this.role = this._data.role || UserRoles.MEMBER;
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
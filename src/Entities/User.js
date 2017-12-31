const Entity = require('../DTO/Entity.js')
const UserRoles = require('../typedefs.js').UserRoles

/**
 * @class
 * @extends {Entity}
 */
class User extends Entity {
  get login () {
    return this._data.login || null
  }

  set login (val) {
    this._data.login = val
  }

  get password () {
    return this._data.password || null
  }

  set password (val) {
    this._data.password = val
  }

  get email () {
    return this._data.email || null
  }

  set email (val) {
    this._data.email = val
  }

  get name () {
    return this._data.name || ''
  }

  set name (val) {
    this._data.name = val
  }

  /**
   * @type {boolean}
   */
  get activated () {
    return this._data.activated || false
  }

  /**
   * @type {boolean}
   */
  set activated (val) {
    this._data.activated = val
  }

  /**
   * @type {UserRole}
   */
  get role () {
    return this._data.role || UserRoles.MEMBER
  }

  /**
   * @type {UserRole}
   */
  set role (val) {
    this._data.role = val
  }

  /**
   * @desc Check if user is in admin role
   * @returns {Boolean}
   */
  isAdmin () {
    return this.role === UserRoles.ADMIN
  }

  /**
   * @desc Check if user is in member role
   * @returns {Boolean}
   */
  isMember () {
    return this.role === UserRoles.MEMBER
  }

  static precreate (login, password, email) {
    return new User({ login, password, email })
  }
}

module.exports = User

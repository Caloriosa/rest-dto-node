const Entity = require('../DTO/Entity.js')
const { IdentityTypes } = require('../typedefs.js')

/**
 * @class AuthInfo
 * @extends {Entity}
 */
class AuthInfo extends Entity {
  /**
   * @type {?string}
   * @public
   */
  get token () {
    return this._data.token || null
  }

  /**
   * @type {IdentityType}
   * @public
   */
  get type () {
    return this._data.type || IdentityTypes.UNKNOWN
  }

  /**
   * @type {?Date}
   * @public
   */
  get expireAt () {
    if (!this._data.expireat) {
      return null
    }
    return new Date(this._data.expireat)
  }

  /**
   * @type {?string}
   * @public
   */
  get identityId () {
    if (this.type === IdentityTypes.USER) {
      return this._data.user || null
    }
    if (this.type === IdentityTypes.DEVICE) {
      return this._data.device || null
    }
    return null
  }
}

module.exports = AuthInfo

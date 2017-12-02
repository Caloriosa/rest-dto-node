const AbstractDto = require("./abstractDto.js");

class User extends AbstractDto {
  get login() {
    return this._data.login || null;
  }

  set login(val) {
    this._data.login = val;
  }

  get password() {
    return this._data.password || null;
  }

  set password(val) {
    return this._data.password = val;
  }

  get email() {
    return this._data.email || null;
  }

  set email(val) {
    this._data.email = val;
  }

  get name() {
    return this._data.name || "";
  }

  set name(val) {
    this._data.name = val;
  }

  get createdAt() {
    return this._data.createdAt || null;
  }

  get activated() {
    return this._data.activated || false;
  }

  set activated(val) {
    this._data.activated = val;
  }
}

module.exports = User;
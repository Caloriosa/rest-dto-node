class AbstractDto {
  constructor(data) {
    this._data = data;
  }

  get uid() {
    return this._data.uid || null;
  }
}

module.exports = AbstractDto;
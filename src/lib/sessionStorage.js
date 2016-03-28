class SessionStorage {
  _store = {};

  constructor() {

  }

  setStorage(store) {
    this._store = store;
  }

  get(key, defaultValue) {
    return this._store[key] || defaultValue;
  }

  set(key, value) {
    this._store[key] = value;
  }
}

export default new SessionStorage();
export class LaPressModule {
  constructor(payload) {
    this._isRegistered = false;
    this._d = payload;
  }

  config() {
    return this._d.config;
  }

  key() {
    return this._d.key;
  }

  register(Vue, options = {}) {
    if (this._isRegistered) {
      return;
    }

    Vue.use({ install: this._d.register }, options);
    this._isRegistered = true;
  }
}

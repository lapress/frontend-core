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

    register(Vue) {
        if (this._isRegistered) {
            return;
        }

        Vue.use({ install: this._d.register });
        this._isRegistered = true;
    }
}

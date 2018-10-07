"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Env {
  constructor() {
    _defineProperty(this, "environment", process && process.env && process.env.NODE_ENV || 'development');

    _defineProperty(this, "isDevelopment", this.environment === 'development');

    _defineProperty(this, "isTesting", this.environment === 'testing');

    _defineProperty(this, "isProduction", this.environment === 'production');

    _defineProperty(this, "isServerSide", typeof process !== 'undefined' && process.versions !== null && process.versions.node !== null);

    _defineProperty(this, "isClientSide", typeof window !== 'undefined' && typeof window.document !== 'undefined');
  }

}

exports.default = Env;
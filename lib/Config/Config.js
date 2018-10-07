"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _has = _interopRequireDefault(require("lodash/has"));

var _get = _interopRequireDefault(require("lodash/get"));

var _set = _interopRequireDefault(require("lodash/set"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Manage configuration for an application by adding config objects.
 *
 * @author Anton Drobot
 */
class Config {
  constructor() {
    _defineProperty(this, "config", {});
  }

  has(id) {
    return (0, _has.default)(this.config, id);
  }

  get(id, defaultValue) {
    if (typeof id === 'undefined') {
      return this.config;
    }

    return (0, _get.default)(this.config, id, defaultValue);
  }

  set(id, value) {
    (0, _set.default)(this.config, id, value);
  }

}

exports.default = Config;
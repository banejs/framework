"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RouterException = _interopRequireDefault(require("./RouterException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * No entry was found in the router.
 */
class NotFoundException extends _RouterException.default {
  constructor() {
    super('No entry was found in the router', 'E_ROUTER_NOT_FOUND', 404); // Set the prototype explicitly.
    // @see https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work

    _defineProperty(this, "name", 'NotFoundException');

    Reflect.setPrototypeOf(this, NotFoundException.prototype);
  }

}

exports.default = NotFoundException;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Exception = _interopRequireDefault(require("../../Exceptions/Exception"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Base interface representing a generic exception in a router.
 */
class RouterException extends _Exception.default {
  constructor(message, code = 'E_ROUTER_EXCEPTION', status = 500) {
    super(message || 'Unexpected router exception', code, status); // Set the prototype explicitly.
    // @see https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work

    _defineProperty(this, "name", 'RouterException');

    Reflect.setPrototypeOf(this, RouterException.prototype);
  }

}

exports.default = RouterException;
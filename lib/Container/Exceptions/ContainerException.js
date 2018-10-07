"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Exception = _interopRequireDefault(require("../../Exceptions/Exception"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Base interface representing a generic exception in a container.
 */
class ContainerException extends _Exception.default {
  constructor(message, code = 'E_CONTAINER_EXCEPTION') {
    super(message || 'Unexpected container exception', code); // Set the prototype explicitly.
    // @see https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work

    _defineProperty(this, "name", 'ContainerException');

    Reflect.setPrototypeOf(this, ContainerException.prototype);
  }

}

exports.default = ContainerException;
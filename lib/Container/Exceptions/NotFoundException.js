"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ContainerException = _interopRequireDefault(require("./ContainerException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * No entry was found in the container.
 */
class NotFoundException extends _ContainerException.default {
  constructor() {
    super('No entry was found in the container', 'E_CONTAINER_NO_ENTRY'); // Set the prototype explicitly.
    // @see https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work

    _defineProperty(this, "name", 'NotFoundException');

    Reflect.setPrototypeOf(this, NotFoundException.prototype);
  }

}

exports.default = NotFoundException;
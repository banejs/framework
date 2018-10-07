"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Exception is a neutral class extend the Error object.
 *
 * @author Anton Drobot
 */
class Exception extends Error {
  /**
   * Error name.
   *
   * @type {string}
   */

  /**
   * A human-readable description of the error.
   *
   * @type {string}
   */

  /**
   * Error unique code.
   *
   * @type {string}
   */

  /**
   * Error status.
   *
   * @type {number}
   */

  /**
   * Custom fields of error.
   *
   * @type {Object}
   */

  /**
   * Stack trace.
   *
   * @type {string}
   */
  constructor(message, code = 'E_INTERNAL_ERROR', status = 500, data = {}) {
    // Because default value for argument didn't work if argument value is empty string.
    super(message || 'Internal error');

    _defineProperty(this, "name", 'Exception');

    _defineProperty(this, "message", void 0);

    _defineProperty(this, "code", void 0);

    _defineProperty(this, "status", void 0);

    _defineProperty(this, "data", void 0);

    _defineProperty(this, "stack", void 0);

    this.message = message || 'Internal error';
    this.code = code;
    this.status = status;
    this.data = data;
    this.stack = new Error(message).stack; // Set the prototype explicitly.
    // @see https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work

    Reflect.setPrototypeOf(this, Exception.prototype);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      status: this.status,
      data: this.data
    };
  }

}

exports.default = Exception;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = normalizeError;

var _Exception = _interopRequireDefault(require("../Exception"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Normalize error object by setting required parameters if they does not exists.
 *
 * @param {Error|ExceptionInterface|*} error
 *
 * @return {ExceptionInterface}
 */
function normalizeError(error) {
  if (!(error instanceof _Exception.default)) {
    return new _Exception.default(error.message);
  }

  return error;
}
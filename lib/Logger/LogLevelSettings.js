"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _LogLevel = _interopRequireDefault(require("./LogLevel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LogLevelSettings = {
  [_LogLevel.default.EMERGENCY]: {
    color: 'red',
    isError: true
  },
  [_LogLevel.default.ALERT]: {
    color: 'red',
    isError: true
  },
  [_LogLevel.default.CRITICAL]: {
    color: 'red',
    isError: true
  },
  [_LogLevel.default.ERROR]: {
    color: 'red',
    isError: true
  },
  [_LogLevel.default.WARNING]: {
    color: 'yellow',
    isError: false
  },
  [_LogLevel.default.NOTICE]: {
    color: 'yellow',
    isError: false
  },
  [_LogLevel.default.INFO]: {
    color: 'blue',
    isError: false
  },
  [_LogLevel.default.DEBUG]: {
    color: 'cyan',
    isError: false
  }
};
var _default = LogLevelSettings;
exports.default = _default;
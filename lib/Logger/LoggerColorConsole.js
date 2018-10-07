"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _LogLevel = _interopRequireDefault(require("./LogLevel"));

var _LogLevelSettings = _interopRequireDefault(require("./LogLevelSettings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LoggerColorConsole {
  color(str, color) {
    if (color && typeof _chalk.default[color] !== 'undefined') {
      return _chalk.default[color](str);
    }

    return str;
  }

  getTime() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  }
  /**
   * System is unusable.
   *
   * @param {string|Error} message
   * @param {Object} [context={}]
   */


  emergency(message, context = {}) {
    if (message instanceof Error && message.stack) {
      this.log(_LogLevel.default.EMERGENCY, message.stack, context);
    } else if (message instanceof Error) {
      this.log(_LogLevel.default.EMERGENCY, message.message, context);
    } else {
      this.log(_LogLevel.default.EMERGENCY, message, context);
    }
  }
  /**
   * Action must be taken immediately.
   *
   * Example: Entire website down, database unavailable, etc. This should
   * trigger the SMS alerts and wake you up.
   *
   * @param {string|Error} message
   * @param {Object} [context={}]
   */


  alert(message, context = {}) {
    if (message instanceof Error && message.stack) {
      this.log(_LogLevel.default.ALERT, message.stack, context);
    } else if (message instanceof Error) {
      this.log(_LogLevel.default.ALERT, message.message, context);
    } else {
      this.log(_LogLevel.default.ALERT, message, context);
    }
  }
  /**
   * Critical conditions.
   *
   * Example: Application component unavailable, unexpected exception.
   *
   * @param {string|Error} message
   * @param {Object} [context={}]
   */


  critical(message, context = {}) {
    if (message instanceof Error && message.stack) {
      this.log(_LogLevel.default.CRITICAL, message.stack, context);
    } else if (message instanceof Error) {
      this.log(_LogLevel.default.CRITICAL, message.message, context);
    } else {
      this.log(_LogLevel.default.CRITICAL, message, context);
    }
  }
  /**
   * Runtime errors that do not require immediate action but should typically
   * be logged and monitored.
   *
   * @param {string|Error} message
   * @param {Object} [context={}]
   */


  error(message, context = {}) {
    if (message instanceof Error && message.stack) {
      this.log(_LogLevel.default.ERROR, message.stack, context);
    } else if (message instanceof Error) {
      this.log(_LogLevel.default.ERROR, message.message, context);
    } else {
      this.log(_LogLevel.default.ERROR, message, context);
    }
  }
  /**
   * Exceptional occurrences that are not errors.
   *
   * Example: Use of deprecated APIs, poor use of an API, undesirable things
   * that are not necessarily wrong.
   *
   * @param {string} message
   * @param {Object} [context={}]
   */


  warning(message, context = {}) {
    this.log(_LogLevel.default.WARNING, message, context);
  }
  /**
   * Normal but significant events.
   *
   * @param {string} message
   * @param {Object} [context={}]
   */


  notice(message, context = {}) {
    this.log(_LogLevel.default.NOTICE, message, context);
  }
  /**
   * Interesting events.
   *
   * Example: User logs in, SQL logs.
   *
   * @param {string} message
   * @param {Object} [context={}]
   */


  info(message, context = {}) {
    this.log(_LogLevel.default.INFO, message, context);
  }
  /**
   * Detailed debug information.
   *
   * @param {string} message
   * @param {Object} [context={}]
   */


  debug(message, context = {}) {
    this.log(_LogLevel.default.DEBUG, message, context);
  }
  /**
   * Logs with an arbitrary level.
   *
   * @param {string} level
   * @param {string} message
   * @param {Object} [context={}]
   */


  log(level, message, context = {}) {
    const levelSettings = _LogLevelSettings.default[level];
    const levelColor = levelSettings && levelSettings.color;
    const isError = levelSettings && levelSettings.isError || false;
    const coloredLevelString = this.color(`[${level}]`, levelColor);
    const coloredTime = this.color(this.getTime(), 'yellow');
    const generatedMessage = message.replace(/{{([a-z][a-z0-9]*)}}/gi, (match, variable) => String(context[variable] || match));
    const logMessage = `${coloredTime} ${coloredLevelString} ${generatedMessage}\n\n`;

    if (isError) {
      process.stderr.write(logMessage);
    } else {
      process.stdout.write(logMessage);
    }
  }

}

exports.default = LoggerColorConsole;
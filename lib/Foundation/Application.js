"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @author Anton Drobot
 */
class Application {
  /**
   * Inversion of Control Container.
   *
   * @type {ContainerInterface}
   */

  /**
   * Create a new application instance.
   *
   * @param {ContainerInterface} container - Inversion of Control Container.
   */
  constructor(container) {
    _defineProperty(this, "container", void 0);

    this.container = container;
  }
  /**
   * Handles a request.
   *
   * @param {(container: ContainerInterface) => void} callback
   */


  handle(callback) {
    callback(this.container);
  }

}

exports.default = Application;
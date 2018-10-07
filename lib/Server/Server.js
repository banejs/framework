"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koa = _interopRequireDefault(require("koa"));

var _escape = _interopRequireDefault(require("lodash/escape"));

var _normalizeError = _interopRequireDefault(require("../Exceptions/lib/normalizeError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Server {
  /**
   * @param env - Dependency.
   * @param logger - Dependency.
   * @param router - Dependency.
   */
  constructor(env, logger, router) {
    _defineProperty(this, "env", void 0);

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "router", void 0);

    _defineProperty(this, "appInstance", new _koa.default());

    this.env = env;
    this.logger = logger;
    this.router = router;
  }
  /**
   * Request handler to respond to a given HTTP request.
   *
   * @param {Koa.Context} context
   *
   * @return {Promise.<void>}
   *
   * @private
   */


  async handle(context) {
    try {
      const method = context.method;
      const resolvedRoute = this.router.resolve(context.url, method);
      /**
       * Assign route path parameters to context state.
       */

      context.state.params = resolvedRoute.params;
      context.body = await resolvedRoute.handler(context);
    } catch (error) {
      const normalizedError = (0, _normalizeError.default)(error);
      context.status = normalizedError.status;

      if (this.env.isDevelopment) {
        context.body = (0, _escape.default)(error.stack);
      }

      this.logger.error(normalizedError);
    }
  }
  /**
   * Returns Koa application.
   *
   * @return {Koa}
   */


  app() {
    return this.appInstance;
  }
  /**
   * Registering middleware to run during every HTTP request to your application.
   *
   * @param {Koa.Middleware|Array<Koa.Middleware>} middleware
   */


  middleware(middleware) {
    const middlewareList = Array.isArray(middleware) ? middleware : [middleware];
    middlewareList.forEach(m => {
      this.appInstance.use(m);
    });
  }
  /**
   * Starting a server on a given port and host.
   *
   * @param {string} [host='localhost']
   * @param {number} [port=3000]
   * @param {Function} [callback]
   *
   * @return {HttpServer}
   */


  listen(host = 'localhost', port = 3000, callback) {
    this.logger.debug('Waiting for server start...');
    this.appInstance.use(this.handle.bind(this));
    return this.appInstance.listen(port, host, () => {
      this.logger.debug('Serving app on http://{{host}}:{{port}}/', {
        host,
        port
      });

      if (typeof callback !== 'undefined') {
        callback();
      }
    });
  }

}

exports.default = Server;
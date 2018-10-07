"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pathToRegexp = _interopRequireDefault(require("path-to-regexp"));

var _NotFoundException = _interopRequireDefault(require("./Exceptions/NotFoundException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Router {
  constructor() {
    _defineProperty(this, "routesCollection", []);
  }

  /**
   * Construct a new route using path-to-regexp.
   *
   * @param {string} route
   * @param {MethodType|Array<MethodType>} method
   * @param {HandlerType} handler
   * @param {string} name
   *
   * @return {RouteType}
   *
   * @private
   */
  makeRoute(route, method, handler, name) {
    const methods = Array.isArray(method) ? method : [method]; // route can register for multiple methods

    const {
      pattern,
      tokens
    } = this.makeRoutePattern(route);
    return {
      name,
      route,
      pattern,
      tokens,
      params: {},
      methods,
      handler
    };
  }
  /**
   * Make regex pattern for a given route.
   *
   * @param {string} route
   *
   * @return {{pattern: RegExp, tokens: Array<TokenType>}}
   *
   * @private
   */


  makeRoutePattern(route) {
    const tokens = [];
    const pattern = (0, _pathToRegexp.default)(route, tokens);
    return {
      pattern,
      tokens
    };
  }
  /**
   * Resolve route from routes store based upon current URL.
   *
   * @throws {NotFoundExceptionInterface} - No entry was found for path.
   *
   * @param {string} path - Path to url.
   * @param {MethodType} method - HTTP method.
   *
   * @return {RouteType}
   *
   * @private
   */


  returnMatchingRouteToUrl(path, method) {
    const route = this.routesCollection.find(r => r.pattern.test(path) && r.methods.includes(method));

    if (!route) {
      throw new _NotFoundException.default();
    }

    return _objectSpread({}, route, {
      params: this.getRouteParams(route, path)
    });
  }

  getRouteParams(route, path) {
    const paramsValues = route.pattern.exec(path);
    const params = {};

    if (paramsValues) {
      route.tokens.forEach((token, index) => {
        params[token.name] = paramsValues[index + 1];
      });
    }

    return params;
  }
  /**
   * Returns all registered routes.
   *
   * @return {Array<RouteType>}
   */


  routes() {
    return this.routesCollection;
  }
  /**
   * A low level method to register route with path, method and handler.
   *
   * @param {string} route - Route expression.
   * @param {MethodType|Array<MethodType>} method - HTTP method.
   * @param {HandlerType} handler - Handler to respond to a given request.
   * @param {?string} [name=null] - Route name.
   *
   * @example
   * Route.route('/welcome', 'GET', async () => {
   *
   * });
   */


  route(route, method, handler, name = null) {
    const constructedRoute = this.makeRoute(route, method, handler, name);
    this.routesCollection.push(constructedRoute);
  }
  /**
   * Register route with GET method.
   *
   * @param {string} route - Route expression.
   * @param {Function} handler - Handler to respond to a given request.
   * @param {?string} [name=null] - Route name.
   *
   * @example
   * Route.get('/user', async () => {
   *
   * });
   */


  get(route, handler, name = null) {
    this.route(route, ['GET', 'HEAD'], handler, name);
  }
  /**
   * Register route with POST method.
   *
   * @param {string} route - Route expression.
   * @param {Function} handler - Handler to respond to a given request.
   * @param {?string} [name=null] - Route name.
   *
   * @example
   * Route.post('/user', async () => {
   *
   * });
   */


  post(route, handler, name = null) {
    this.route(route, 'POST', handler, name);
  }
  /**
   * Register route with PUT method.
   *
   * @param {string} route - Route expression.
   * @param {Function} handler - Handler to respond to a given request.
   * @param {?string} [name=null] - Route name.
   *
   * @example
   * Route.put('/user/:id', async () => {
   *
   * });
   */


  put(route, handler, name = null) {
    this.route(route, 'PUT', handler, name);
  }
  /**
   * Register route with PATCH method.
   *
   * @param {string} route - Route expression.
   * @param {Function} handler - Handler to respond to a given request.
   * @param {?string} [name=null] - Route name.
   *
   * @example
   * Route.patch('/user/:id', async () => {
   *
   * });
   */


  patch(route, handler, name = null) {
    this.route(route, 'PATCH', handler, name);
  }
  /**
   * Register route with DELETE method.
   *
   * @param {string} route - Route expression.
   * @param {Function} handler - Handler to respond to a given request.
   * @param {?string} [name=null] - Route name.
   *
   * @example
   * Route.delete('/user/:id', async () => {
   *
   * });
   */


  delete(route, handler, name = null) {
    this.route(route, 'DELETE', handler, name);
  }
  /**
   * Register route with OPTIONS method.
   *
   * @param {string} route - Route expression.
   * @param {Function} handler - Handler to respond to a given request.
   * @param {?string} [name=null] - Route name.
   *
   * @example
   * Route.options('/user/:id', async () => {
   *
   * });
   */


  options(route, handler, name = null) {
    this.route(route, 'OPTIONS', handler, name);
  }
  /**
   * Registers a route with multiple HTTP methods.
   *
   * @param {string} route - Route expression.
   * @param {Array} methods - An array of methods.
   * @param {Function} handler - Handler to respond to a given request.
   * @param {?string} [name=null] - Route name.
   *
   * @example
   * Route.match(['GET', 'POST'], '/user', async () => {
   *
   * });
   */


  match(route, methods, handler, name = null) {
    this.route(route, methods, handler, name);
  }
  /**
   * Registers route for all HTTP methods.
   *
   * @param {string} route - Route expression.
   * @param {Function} handler - Handler to respond to a given request.
   * @param {?string} [name=null] - Route name.
   *
   * @example
   * Route.any('/user', async () => {
   *
   * });
   */


  any(route, handler, name = null) {
    const methods = ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];
    this.route(route, methods, handler, name);
  }
  /**
   * Resolves route for a given url and HTTP method.
   *
   * @param {string} path - Path to url.
   * @param {string} method - HTTP method.
   *
   * @return {RouteType}
   *
   * @example
   * Route.resolve('/user/1', 'GET');
   */


  resolve(path, method) {
    return this.returnMatchingRouteToUrl(path, method);
  }

}

exports.default = Router;
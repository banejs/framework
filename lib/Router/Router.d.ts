import RouterInterface from './RouterInterface';
import { RouteType } from './Types/RouteType';
import { MethodType } from './Types/MethodType';
import { HandlerType } from './Types/HandlerType';
export default class Router implements RouterInterface {
    /**
     * Holding reference to registered routes.
     *
     * @type {Array<RouteType>}
     *
     * @private
     */
    private routesCollection;
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
    private makeRoute;
    /**
     * Make regex pattern for a given route.
     *
     * @param {string} route
     *
     * @return {{pattern: RegExp, tokens: Array<TokenType>}}
     *
     * @private
     */
    private makeRoutePattern;
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
    private returnMatchingRouteToUrl;
    private getRouteParams;
    /**
     * Returns all registered routes.
     *
     * @return {Array<RouteType>}
     */
    routes(): Array<RouteType>;
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
    route(route: string, method: MethodType | Array<MethodType>, handler: HandlerType, name?: string | null): void;
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
    get(route: string, handler: HandlerType, name?: string | null): void;
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
    post(route: string, handler: HandlerType, name?: string | null): void;
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
    put(route: string, handler: HandlerType, name?: string | null): void;
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
    patch(route: string, handler: HandlerType, name?: string | null): void;
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
    delete(route: string, handler: HandlerType, name?: string | null): void;
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
    options(route: string, handler: HandlerType, name?: string | null): void;
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
    match(route: string, methods: Array<MethodType>, handler: HandlerType, name?: string | null): void;
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
    any(route: string, handler: HandlerType, name?: string | null): void;
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
    resolve(path: string, method: MethodType): RouteType;
}

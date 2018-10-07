import pathToRegexp from 'path-to-regexp';

import RouterInterface from './RouterInterface';

import { TokenType } from './Types/TokenType';
import { RouteType } from './Types/RouteType';
import { ParamsType } from './Types/ParamsType';
import { MethodType } from './Types/MethodType';
import { HandlerType } from './Types/HandlerType';

import NotFoundException from './Exceptions/NotFoundException';

export default class Router implements RouterInterface {
    /**
     * Holding reference to registered routes.
     *
     * @type {Array<RouteType>}
     *
     * @private
     */
    private routesCollection: Array<RouteType> = [];

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
    private makeRoute(route: string, method: MethodType | Array<MethodType>, handler: HandlerType, name: string | null): RouteType {
        const methods: Array<MethodType> = Array.isArray(method) ? method : [method]; // route can register for multiple methods
        const { pattern, tokens }: { pattern: RegExp; tokens: Array<TokenType> } = this.makeRoutePattern(route);

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
    private makeRoutePattern(route: string): { pattern: RegExp; tokens: Array<TokenType> } {
        const tokens: Array<TokenType> = [];
        const pattern: RegExp = pathToRegexp(route, tokens);

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
    private returnMatchingRouteToUrl(path: string, method: MethodType): RouteType {
        const route: RouteType | undefined = this.routesCollection.find((r: RouteType): boolean => (r.pattern.test(path) && r.methods.includes(method)));

        if (!route) {
            throw new NotFoundException();
        }

        return {
            ...route,
            params: this.getRouteParams(route, path)
        };
    }

    private getRouteParams(route: RouteType, path: string): ParamsType {
        const paramsValues: Array<string> | null = route.pattern.exec(path);
        const params: ParamsType = {};

        if (paramsValues) {
            route.tokens.forEach((token: TokenType, index: number): void => {
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
    public routes(): Array<RouteType> {
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
    public route(route: string, method: MethodType | Array<MethodType>, handler: HandlerType, name: string | null = null): void {
        const constructedRoute: RouteType = this.makeRoute(route, method, handler, name);

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
    public get(route: string, handler: HandlerType, name: string | null = null): void {
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
    public post(route: string, handler: HandlerType, name: string | null = null): void {
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
    public put(route: string, handler: HandlerType, name: string | null = null): void {
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
    public patch(route: string, handler: HandlerType, name: string | null = null): void {
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
    public delete(route: string, handler: HandlerType, name: string | null = null): void {
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
    public options(route: string, handler: HandlerType, name: string | null = null): void {
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
    public match(route: string, methods: Array<MethodType>, handler: HandlerType, name: string | null = null): void {
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
    public any(route: string, handler: HandlerType, name: string | null = null): void {
        const methods: Array<MethodType> = ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

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
    public resolve(path: string, method: MethodType): RouteType {
        return this.returnMatchingRouteToUrl(path, method);
    }
}

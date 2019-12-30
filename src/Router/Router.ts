import IRouter from './IRouter';
import IRoute from './IRoute';

import { MethodType } from './types/MethodType';
import { HandlerType } from './types/HandlerType';

import Route from './Route';

import NotFoundException from './Exceptions/NotFoundException';

export default class Router implements IRouter {
    /**
     * Holding reference to registered routes.
     *
     * @type {Array<IRoute>}
     *
     * @private
     */
    private routesCollection: Array<IRoute> = [];

    /**
     * Returns all registered routes.
     *
     * @return {ReadonlyArray<IRoute>}
     */
    public routes(): ReadonlyArray<IRoute> {
        return this.routesCollection;
    }

    /**
     * A low level method to register route with path, method and handler.
     *
     * @param {string} route - Route expression.
     * @param {MethodType|ReadonlyArray<MethodType>} method - HTTP method.
     * @param {HandlerType} handler - Handler to respond to a given request.
     *
     * @return {IRoute}
     *
     * @example
     * Route.route('/welcome', 'GET', async () => {
     *
     * });
     */
    public route(route: string, method: MethodType | ReadonlyArray<MethodType>, handler: HandlerType): IRoute {
        const routeInstance: IRoute = new Route(route, method, handler);

        this.routesCollection.push(routeInstance);

        return routeInstance;
    }

    /**
     * Register route with GET method.
     *
     * @param {string} route - Route expression.
     * @param {Function} handler - Handler to respond to a given request.
     *
     * @return {IRoute}
     *
     * @example
     * Route.get('/user', async () => {
     *
     * });
     */
    public get(route: string, handler: HandlerType): IRoute {
        return this.route(route, ['GET', 'HEAD'], handler);
    }

    /**
     * Register route with POST method.
     *
     * @param {string} route - Route expression.
     * @param {Function} handler - Handler to respond to a given request.
     *
     * @return {IRoute}
     *
     * @example
     * Route.post('/user', async () => {
     *
     * });
     */
    public post(route: string, handler: HandlerType): IRoute {
        return this.route(route, 'POST', handler);
    }

    /**
     * Register route with PUT method.
     *
     * @param {string} route - Route expression.
     * @param {Function} handler - Handler to respond to a given request.
     *
     * @return {IRoute}
     *
     * @example
     * Route.put('/user/:id', async () => {
     *
     * });
     */
    public put(route: string, handler: HandlerType): IRoute {
        return this.route(route, 'PUT', handler);
    }

    /**
     * Register route with PATCH method.
     *
     * @param {string} route - Route expression.
     * @param {Function} handler - Handler to respond to a given request.
     *
     * @return {IRoute}
     *
     * @example
     * Route.patch('/user/:id', async () => {
     *
     * });
     */
    public patch(route: string, handler: HandlerType): IRoute {
        return this.route(route, 'PATCH', handler);
    }

    /**
     * Register route with DELETE method.
     *
     * @param {string} route - Route expression.
     * @param {Function} handler - Handler to respond to a given request.
     *
     * @return {IRoute}
     *
     * @example
     * Route.delete('/user/:id', async () => {
     *
     * });
     */
    public delete(route: string, handler: HandlerType): IRoute {
        return this.route(route, 'DELETE', handler);
    }

    /**
     * Register route with OPTIONS method.
     *
     * @param {string} route - Route expression.
     * @param {Function} handler - Handler to respond to a given request.
     *
     * @return {IRoute}
     *
     * @example
     * Route.options('/user/:id', async () => {
     *
     * });
     */
    public options(route: string, handler: HandlerType): IRoute {
        return this.route(route, 'OPTIONS', handler);
    }

    /**
     * Registers a route with multiple HTTP methods.
     *
     * @param {string} route - Route expression.
     * @param {ReadonlyArray<MethodType>} methods - An array of methods.
     * @param {Function} handler - Handler to respond to a given request.
     *
     * @return {IRoute}
     *
     * @example
     * Route.match(['GET', 'POST'], '/user', async () => {
     *
     * });
     */
    public match(route: string, methods: ReadonlyArray<MethodType>, handler: HandlerType): IRoute {
        return this.route(route, methods, handler);
    }

    /**
     * Registers route for all HTTP methods.
     *
     * @param {string} route - Route expression.
     * @param {Function} handler - Handler to respond to a given request.
     *
     * @return {IRoute}
     *
     * @example
     * Route.any('/user', async () => {
     *
     * });
     */
    public any(route: string, handler: HandlerType): IRoute {
        const methods: ReadonlyArray<MethodType> = ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

        return this.route(route, methods, handler);
    }

    /**
     * Resolves route for a given URL and HTTP method.
     *
     * @throws {NotFoundExceptionInterface} - No entry was found for path.
     *
     * @param {string} path - URL or path of URL.
     * @param {string} method - HTTP method.
     *
     * @return {IRoute}
     *
     * @example
     * Route.resolve('/user/1', 'GET');
     */
    public resolve(path: string, method: MethodType): IRoute {
        const route: IRoute | undefined = this.routesCollection.find((r: IRoute): boolean => (
            r.pattern.test(path) && r.methods.includes(method)
        ));

        if (!route) {
            throw new NotFoundException();
        }

        return route;
    }
}

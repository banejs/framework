import Koa from 'koa';

import IRouter from './types/IRouter';
import IRoute from './types/IRoute';
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
    private routesCollection: Array<IRoute<any, any>> = [];

    /**
     * Returns all registered routes.
     *
     * @return {ReadonlyArray<IRoute>}
     */
    public routes(): ReadonlyArray<IRoute<any, any>> {
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
    public route<T = Koa.DefaultState, S = Koa.DefaultContext>(route: string, method: MethodType | ReadonlyArray<MethodType>, handler: HandlerType<T, S>): IRoute<T, S> {
        // @ts -ignore ignore incompatible of handler type
        const routeInstance: IRoute<T, S> = new Route<T, S>(route, method, handler);

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
    public get<T = Koa.DefaultState, S = Koa.DefaultContext>(route: string, handler: HandlerType<T, S>): IRoute<T, S> {
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
    public post<T = Koa.DefaultState, S = Koa.DefaultContext>(route: string, handler: HandlerType<T, S>): IRoute<T, S> {
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
    public put<T = Koa.DefaultState, S = Koa.DefaultContext>(route: string, handler: HandlerType<T, S>): IRoute<T, S> {
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
    public patch<T = Koa.DefaultState, S = Koa.DefaultContext>(route: string, handler: HandlerType<T, S>): IRoute<T, S> {
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
    public delete<T = Koa.DefaultState, S = Koa.DefaultContext>(route: string, handler: HandlerType<T, S>): IRoute<T, S> {
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
    public options<T = Koa.DefaultState, S = Koa.DefaultContext>(route: string, handler: HandlerType<T, S>): IRoute<T, S> {
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
    public match<T = Koa.DefaultState, S = Koa.DefaultContext>(route: string, methods: ReadonlyArray<MethodType>, handler: HandlerType<T, S>): IRoute<T, S> {
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
    public any<T = Koa.DefaultState, S = Koa.DefaultContext>(route: string, handler: HandlerType<T, S>): IRoute<T, S> {
        const methods: ReadonlyArray<MethodType> = ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

        return this.route(route, methods, handler);
    }

    /**
     * Resolves route for a given URL and HTTP method.
     *
     * @throws {INotFoundException} - No entry was found for path.
     *
     * @param {string} path - URL or path of URL.
     * @param {string} method - HTTP method.
     *
     * @return {IRoute}
     *
     * @example
     * Route.resolve('/user/1', 'GET');
     */
    public resolve<T = Koa.DefaultState, S = Koa.DefaultContext>(path: string, method: MethodType): IRoute<T, S> {
        const route: IRoute<T, S> | undefined = this.routesCollection.find((r: IRoute<T, S>): boolean => (
            r.pattern.test(path) && r.methods.includes(method)
        ));

        if (!route) {
            throw new NotFoundException();
        }

        return route;
    }
}

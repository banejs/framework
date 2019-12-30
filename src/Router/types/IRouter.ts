import IRoute from './IRoute';

import { MethodType } from './MethodType';
import { HandlerType } from './HandlerType';

export default interface IRouter {
    /**
     * Returns all registered routes.
     *
     * @return {ReadonlyArray<IRoute>}
     */
    routes(): ReadonlyArray<IRoute>;

    /**
     * A low level method to register route with path, method and handler.
     *
     * @param {string} route - Route expression.
     * @param {MethodType|ReadonlyArray<MethodType>} method - HTTP method.
     * @param {HandlerType} handler - Handler to respond to a given request.
     */
    route(route: string, method: MethodType | ReadonlyArray<MethodType>, handler: HandlerType): IRoute;

    /**
     * Register route with GET method.
     *
     * @param {string} route - Route expression.
     * @param {HandlerType} handler - Handler to respond to a given request.
     */
    get(route: string, handler: HandlerType): IRoute;

    /**
     * Register route with POST method.
     *
     * @param {string} route - Route expression.
     * @param {HandlerType} handler - Handler to respond to a given request.
     */
    post(route: string, handler: HandlerType): IRoute;

    /**
     * Register route with PUT method.
     *
     * @param {string} route - Route expression.
     * @param {HandlerType} handler - Handler to respond to a given request.
     */
    put(route: string, handler: HandlerType): IRoute;

    /**
     * Register route with PATCH method.
     *
     * @param {string} route - Route expression.
     * @param {HandlerType} handler - Handler to respond to a given request.
     */
    patch(route: string, handler: HandlerType): IRoute;

    /**
     * Register route with DELETE method.
     *
     * @param {string} route - Route expression.
     * @param {HandlerType} handler - Handler to respond to a given request.
     */
    delete(route: string, handler: HandlerType): IRoute;

    /**
     * Register route with OPTIONS method.
     *
     * @param {string} route - Route expression.
     * @param {HandlerType} handler - Handler to respond to a given request.
     */
    options(route: string, handler: HandlerType): IRoute;

    /**
     * Registers a route with multiple HTTP methods.
     *
     * @param {string} route - Route expression.
     * @param {ReadonlyArray<MethodType>} methods - An array of methods.
     * @param {HandlerType} handler - Handler to respond to a given request.
     * @param {string} [name] - Route name.
     */
    match(route: string, methods: ReadonlyArray<MethodType>, handler: HandlerType, name?: string): IRoute;

    /**
     * Registers route for all HTTP methods.
     *
     * @param {string} route - Route expression.
     * @param {HandlerType} handler - Handler to respond to a given request.
     */
    any(route: string, handler: HandlerType): IRoute;

    /**
     * Resolves route for a given url and HTTP method.
     *
     * @param {string} path - Path to url.
     * @param {MethodType} method - HTTP method.
     *
     * @return {IRoute}
     */
    resolve(path: string, method: MethodType): IRoute;
}

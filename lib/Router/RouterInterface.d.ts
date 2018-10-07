import { RouteType } from './Types/RouteType';
import { MethodType } from './Types/MethodType';
import { HandlerType } from './Types/HandlerType';
export default interface RouterInterface {
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
     * @param {string} [name] - Route name.
     */
    route(route: string, method: MethodType | Array<MethodType>, handler: HandlerType, name?: string): void;
    /**
     * Register route with GET method.
     *
     * @param {string} route - Route expression.
     * @param {HandlerType} handler - Handler to respond to a given request.
     * @param {string} [name] - Route name.
     */
    get(route: string, handler: HandlerType, name?: string): void;
    /**
     * Register route with POST method.
     *
     * @param {string} route - Route expression.
     * @param {HandlerType} handler - Handler to respond to a given request.
     * @param {string} [name] - Route name.
     */
    post(route: string, handler: HandlerType, name?: string): void;
    /**
     * Register route with PUT method.
     *
     * @param {string} route - Route expression.
     * @param {HandlerType} handler - Handler to respond to a given request.
     * @param {string} [name] - Route name.
     */
    put(route: string, handler: HandlerType, name?: string): void;
    /**
     * Register route with PATCH method.
     *
     * @param {string} route - Route expression.
     * @param {HandlerType} handler - Handler to respond to a given request.
     * @param {string} [name] - Route name.
     */
    patch(route: string, handler: HandlerType, name?: string): void;
    /**
     * Register route with DELETE method.
     *
     * @param {string} route - Route expression.
     * @param {HandlerType} handler - Handler to respond to a given request.
     * @param {string} [name] - Route name.
     */
    delete(route: string, handler: HandlerType, name?: string): void;
    /**
     * Register route with OPTIONS method.
     *
     * @param {string} route - Route expression.
     * @param {HandlerType} handler - Handler to respond to a given request.
     * @param {string} [name] - Route name.
     */
    options(route: string, handler: HandlerType, name?: string): void;
    /**
     * Registers a route with multiple HTTP methods.
     *
     * @param {string} route - Route expression.
     * @param {Array<MethodType>} methods - An array of methods.
     * @param {HandlerType} handler - Handler to respond to a given request.
     * @param {string} [name] - Route name.
     */
    match(route: string, methods: Array<MethodType>, handler: HandlerType, name?: string): void;
    /**
     * Registers route for all HTTP methods.
     *
     * @param {string} route - Route expression.
     * @param {HandlerType} handler - Handler to respond to a given request.
     * @param {string} [name] - Route name.
     */
    any(route: string, handler: HandlerType, name?: string): void;
    /**
     * Resolves route for a given url and HTTP method.
     *
     * @param {string} path - Path to url.
     * @param {MethodType} method - HTTP method.
     *
     * @return {RouteType}
     */
    resolve(path: string, method: MethodType): RouteType;
}

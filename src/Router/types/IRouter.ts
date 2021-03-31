import Koa from 'koa';

import IRoute from './IRoute';

import { MethodType } from './MethodType';
import { HandlerType } from './HandlerType';
import IServerDefaultContextState from '../../Server/types/IServerDefaultContextState';

export default interface IRouter {
    /**
     * Returns all registered routes.
     *
     * @return {ReadonlyArray<IRoute>}
     */
    routes(): ReadonlyArray<IRoute<any, any>>;

    /**
     * A low level method to register route with path, method and handler.
     *
     * @param {string} route - Route expression.
     * @param {MethodType|ReadonlyArray<MethodType>} method - HTTP method.
     * @param {HandlerType} handler - Handler to respond to a given request.
     */
    route<T extends IServerDefaultContextState = IServerDefaultContextState, S = Koa.DefaultContext>(route: string, method: MethodType | ReadonlyArray<MethodType>, handler: HandlerType<T, S>): IRoute<T, S>;

    /**
     * Register route with GET method.
     *
     * @param {string} route - Route expression.
     * @param {HandlerType} handler - Handler to respond to a given request.
     */
    get<T extends IServerDefaultContextState = IServerDefaultContextState, S = Koa.DefaultContext>(route: string, handler: HandlerType<T, S>): IRoute<T, S>;

    /**
     * Register route with POST method.
     *
     * @param {string} route - Route expression.
     * @param {HandlerType} handler - Handler to respond to a given request.
     */
    post<T extends IServerDefaultContextState = IServerDefaultContextState, S = Koa.DefaultContext>(route: string, handler: HandlerType<T, S>): IRoute<T, S>;

    /**
     * Register route with PUT method.
     *
     * @param {string} route - Route expression.
     * @param {HandlerType} handler - Handler to respond to a given request.
     */
    put<T extends IServerDefaultContextState = IServerDefaultContextState, S = Koa.DefaultContext>(route: string, handler: HandlerType<T, S>): IRoute<T, S>;

    /**
     * Register route with PATCH method.
     *
     * @param {string} route - Route expression.
     * @param {HandlerType} handler - Handler to respond to a given request.
     */
    patch<T extends IServerDefaultContextState = IServerDefaultContextState, S = Koa.DefaultContext>(route: string, handler: HandlerType<T, S>): IRoute<T, S>;

    /**
     * Register route with DELETE method.
     *
     * @param {string} route - Route expression.
     * @param {HandlerType} handler - Handler to respond to a given request.
     */
    delete<T extends IServerDefaultContextState = IServerDefaultContextState, S = Koa.DefaultContext>(route: string, handler: HandlerType<T, S>): IRoute<T, S>;

    /**
     * Register route with OPTIONS method.
     *
     * @param {string} route - Route expression.
     * @param {HandlerType} handler - Handler to respond to a given request.
     */
    options<T extends IServerDefaultContextState = IServerDefaultContextState, S = Koa.DefaultContext>(route: string, handler: HandlerType<T, S>): IRoute<T, S>;

    /**
     * Registers a route with multiple HTTP methods.
     *
     * @param {string} route - Route expression.
     * @param {ReadonlyArray<MethodType>} methods - An array of methods.
     * @param {HandlerType} handler - Handler to respond to a given request.
     * @param {string} [name] - Route name.
     */
    match<T extends IServerDefaultContextState = IServerDefaultContextState, S = Koa.DefaultContext>(route: string, methods: ReadonlyArray<MethodType>, handler: HandlerType<T, S>, name?: string): IRoute<T, S>;

    /**
     * Registers route for all HTTP methods.
     *
     * @param {string} route - Route expression.
     * @param {HandlerType} handler - Handler to respond to a given request.
     */
    any<T extends IServerDefaultContextState = IServerDefaultContextState, S = Koa.DefaultContext>(route: string, handler: HandlerType<T, S>): IRoute<T, S>;

    /**
     * Resolves route for a given url and HTTP method.
     *
     * @param {string} path - Path to url.
     * @param {MethodType} method - HTTP method.
     *
     * @return {IRoute}
     */
    resolve<T extends IServerDefaultContextState = IServerDefaultContextState, S = Koa.DefaultContext>(path: string, method: MethodType): IRoute<T, S>;
}

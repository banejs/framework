import Koa from 'koa';

import { TokenType } from './types/TokenType';
import { MethodType } from './types/MethodType';
import { HandlerType } from './types/HandlerType';
import { ParamsType } from './types/ParamsType';

interface IRoute {
    /**
     * Name of route.
     */
    name: string;

    /**
     * Route expression.
     */
    route: string;

    /**
     * Regex pattern for a given route.
     */
    pattern: RegExp;

    /**
     * Tokens for parameters for a given route.
     */
    tokens: ReadonlyArray<TokenType>;

    /**
     * An array of HTTP methods.
     */
    methods: ReadonlyArray<MethodType>;

    /**
     * Handler to respond to a given request.
     */
    handler: HandlerType;

    /**
     * Middleware queue to be executed before the route handler is executed.
     */
    middlewareList: Array<Koa.Middleware>;

    /**
     * Give name to the route.
     *
     * @param {string} name - Name of route.
     *
     * @return {IRoute}
     */
    as(name: string): IRoute;

    /**
     * Add middleware to the middleware queue to be executed
     * before the route handler is executed.
     *
     * @param {Application.Middleware|ReadonlyArray<Application.Middleware>} middleware - Middleware function.
     *
     * @return {IRoute}
     */
    middleware(middleware: Koa.Middleware | ReadonlyArray<Koa.Middleware>): IRoute;

    /**
     * Get route params assigned to route tokens.
     *
     * @param {string} path - URL or path of URL.
     *
     * @return {ParamsType}
     */
    getRouteParams(path: string): ParamsType;
}

interface IRouteConstructor {
    /**
     * Construct a new route.
     *
     * @param {string} route - Route expression.
     * @param {MethodType|ReadonlyArray<MethodType>} method - HTTP method.
     * @param {HandlerType} handler - Handler to respond to a given request.
     *
     * @return {IRoute}
     */
    new(route: string, method: MethodType | ReadonlyArray<MethodType>, handler: HandlerType): IRoute;
}

declare const IRoute: IRouteConstructor;

export default IRoute;

import Koa from 'koa';
import { pathToRegexp } from 'path-to-regexp';

import { TokenType } from './types/TokenType';
import { MethodType } from './types/MethodType';
import { HandlerType } from './types/HandlerType';

import RouteInterface from './RouteInterface';
import { ParamsType } from './types/ParamsType';

export default class Route implements RouteInterface {
    /**
     * Name of route.
     */
    public name: string;

    /**
     * Route expression.
     */
    public route: string;

    /**
     * Regex pattern for a given route.
     */
    public pattern: RegExp;

    /**
     * Tokens for parameters for a given route.
     */
    public tokens: ReadonlyArray<TokenType>;

    /**
     * An array of HTTP methods.
     */
    public methods: ReadonlyArray<MethodType>;

    /**
     * Handler to respond to a given request.
     */
    public handler: HandlerType;

    /**
     * Middleware queue to be executed before the route handler is executed.
     */
    public middlewareList: Array<Koa.Middleware>;

    /**
     * Construct a new route using path-to-regexp.
     *
     * @param {string} route - Route expression.
     * @param {MethodType|ReadonlyArray<MethodType>} method - HTTP method.
     * @param {HandlerType} handler - Handler to respond to a given request.
     *
     * @return {RouteInterface}
     */
    public constructor(route: string, method: MethodType | ReadonlyArray<MethodType>, handler: HandlerType) {
        // route can register for multiple methods
        const methods: ReadonlyArray<MethodType> = Array.isArray(method) ? method : [method];
        const { pattern, tokens }: { pattern: RegExp; tokens: ReadonlyArray<TokenType> } = this.makeRoutePattern(route);

        this.name = route;
        this.route = route;
        this.pattern = pattern;
        this.tokens = tokens;
        this.methods = methods;
        this.handler = handler;
        this.middlewareList = [];
    }

    /**
     * Make regex pattern for a given route.
     *
     * @param {string} route
     *
     * @return {{pattern: RegExp, tokens: ReadonlyArray<TokenType>}}
     *
     * @private
     */
    private makeRoutePattern(route: string): { pattern: RegExp; tokens: ReadonlyArray<TokenType> } {
        const tokens: Array<TokenType> = [];
        const pattern: RegExp = pathToRegexp(route, tokens);

        return {
            pattern,
            tokens
        };
    }

    /**
     * Give name to the route.
     *
     * @param {string} name - Name of route.
     *
     * @return {RouteInterface}
     */
    public as(name: string): RouteInterface {
        this.name = name;

        return this;
    }

    /**
     * Add middleware to the middleware queue to be executed
     * before the route handler is executed.
     *
     * @param {Application.Middleware|ReadonlyArray<Application.Middleware>} middleware - Middleware function.
     *
     * @return {RouteInterface}
     */
    public middleware(middleware: Koa.Middleware | ReadonlyArray<Koa.Middleware>): RouteInterface {
        this.middlewareList = this.middlewareList.concat(middleware);

        return this;
    }

    /**
     * Get route params assigned to route tokens.
     *
     * @param {string} path - URL or path of URL.
     *
     * @return {ParamsType}
     */
    public getRouteParams(path: string): ParamsType {
        const paramsValues: ReadonlyArray<string> | null = this.pattern.exec(path);
        const params: ParamsType = {};

        if (paramsValues) {
            this.tokens.forEach((token: TokenType, index: number): void => {
                params[token.name] = paramsValues[index + 1];
            });
        }

        return params;
    }
}

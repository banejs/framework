import Koa from 'koa';
import { pathToRegexp } from 'path-to-regexp';

import IRoute from './types/IRoute';
import { TokenType } from './types/TokenType';
import { MethodType } from './types/MethodType';
import { HandlerType } from './types/HandlerType';
import { ParamsType } from './types/ParamsType';

export default class Route<T = Koa.DefaultState, S = Koa.DefaultContext> implements IRoute<T, S> {
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
    public handler: HandlerType<T, S>;

    /**
     * Middleware queue to be executed before the route handler is executed.
     */
    public middlewareList: Array<Koa.Middleware<T, S>>;

    /**
     * Construct a new route using path-to-regexp.
     *
     * @param {string} route - Route expression.
     * @param {MethodType|ReadonlyArray<MethodType>} method - HTTP method.
     * @param {HandlerType} handler - Handler to respond to a given request.
     *
     * @return {IRoute}
     */
    public constructor(route: string, method: MethodType | ReadonlyArray<MethodType>, handler: HandlerType<T, S>) {
        // route can register for multiple methods
        const methods: ReadonlyArray<MethodType> = (Array.isArray(method) ? method : [method]) as ReadonlyArray<MethodType>;
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
     * @return {IRoute}
     */
    public as(name: string): this {
        this.name = name;

        return this;
    }

    /**
     * Add middleware to the middleware queue to be executed
     * before the route handler is executed.
     *
     * @param {Application.Middleware|ReadonlyArray<Application.Middleware>} middleware - Middleware function.
     *
     * @return {IRoute}
     */
    public middleware(middleware: Koa.Middleware<T, S> | ReadonlyArray<Koa.Middleware<T, S>>): this {
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

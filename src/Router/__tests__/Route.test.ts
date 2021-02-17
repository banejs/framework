import IRoute from '../types/IRoute';
import { ParamsType } from '../types/ParamsType';

import Route from '../Route';

describe('Route', (): void => {
    /* tslint:disable */
    function handler() {}
    function middleware1() {}
    function middleware2() {}
    /* tslint:enable */

    describe('#contructor(route, method, handler)', (): void => {
        test('should create route for one method', (): void => {
            const route: IRoute = new Route('/route', 'GET', handler);

            expect(route.name).toBe('/route');
            expect(route.route).toBe('/route');
            expect(route.pattern).toEqual(/^\/route[\/#\?]?$/i);
            expect(route.tokens).toEqual([]);
            expect(route.methods).toEqual(['GET']);
            expect(route.handler).toBe(handler);
            expect(route.middlewareList).toEqual([]);
        });

        test('should create route for multiple methods', (): void => {
            const route: IRoute = new Route('/route', ['GET', 'POST'], handler);

            expect(route.name).toBe('/route');
            expect(route.route).toBe('/route');
            expect(route.pattern).toEqual(/^\/route[\/#\?]?$/i);
            expect(route.tokens).toEqual([]);
            expect(route.methods).toEqual(['GET', 'POST']);
            expect(route.handler).toBe(handler);
            expect(route.middlewareList).toEqual([]);
        });

        test('should create route with tokens', (): void => {
            const route: IRoute = new Route('/user/:name', 'GET', handler);

            expect(route.name).toBe('/user/:name');
            expect(route.route).toBe('/user/:name');
            expect(route.pattern).toEqual(/^\/user(?:\/([^\/#\?]+?))[\/#\?]?$/i);
            expect(route.tokens).toEqual([
                {
                    modifier: '',
                    name: 'name',
                    pattern: '[^\\/#\\?]+?',
                    prefix: '/',
                    suffix: ''
                }
            ]);
            expect(route.methods).toEqual(['GET']);
            expect(route.handler).toBe(handler);
            expect(route.middlewareList).toEqual([]);
        });
    });

    describe('#as(name)', (): void => {
        test('should create route with custom name', (): void => {
            const route: IRoute = new Route('/route', 'GET', handler);

            route.as('route-name');

            expect(route.name).toBe('route-name');
            expect(route.route).toBe('/route');
            expect(route.pattern).toEqual(/^\/route[\/#\?]?$/i);
            expect(route.tokens).toEqual([]);
            expect(route.methods).toEqual(['GET']);
            expect(route.handler).toBe(handler);
            expect(route.middlewareList).toEqual([]);
        });
    });

    describe('#middleware(middleware)', (): void => {
        test('should create route with one middleware', (): void => {
            const route: IRoute = new Route('/route', 'GET', handler);

            route.middleware(middleware1);

            expect(route.name).toBe('/route');
            expect(route.route).toBe('/route');
            expect(route.pattern).toEqual(/^\/route[\/#\?]?$/i);
            expect(route.tokens).toEqual([]);
            expect(route.methods).toEqual(['GET']);
            expect(route.handler).toBe(handler);
            expect(route.middlewareList).toEqual([middleware1]);
        });

        test('should create route with two middleware', (): void => {
            const route: IRoute = new Route('/route', 'GET', handler);

            route.middleware([middleware1, middleware2]);

            expect(route.name).toBe('/route');
            expect(route.route).toBe('/route');
            expect(route.pattern).toEqual(/^\/route[\/#\?]?$/i);
            expect(route.tokens).toEqual([]);
            expect(route.methods).toEqual(['GET']);
            expect(route.handler).toBe(handler);
            expect(route.middlewareList).toEqual([middleware1, middleware2]);
        });

        test('should add second middleware to route', (): void => {
            const route: IRoute = new Route('/route', 'GET', handler);

            route.middleware(middleware1);
            route.middleware(middleware2);

            expect(route.name).toBe('/route');
            expect(route.route).toBe('/route');
            expect(route.pattern).toEqual(/^\/route[\/#\?]?$/i);
            expect(route.tokens).toEqual([]);
            expect(route.methods).toEqual(['GET']);
            expect(route.handler).toBe(handler);
            expect(route.middlewareList).toEqual([middleware1, middleware2]);
        });
    });

    describe('#getRouteParams(route, path)', (): void => {
        test('should return params', (): void => {
            const route: IRoute = new Route('/user/:name', 'GET', handler);
            const params: ParamsType = route.getRouteParams('/user/john-doe');

            expect(params).toEqual({
                name: 'john-doe'
            });
        });

        test('should return params with undefined name param', (): void => {
            const route: IRoute = new Route('/user/:name', 'GET', handler);
            const params: ParamsType = route.getRouteParams('/user');

            expect(params).toEqual({
                name: undefined
            });
        });
    });
});

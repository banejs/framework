import Route from '../Route';

describe('Route', () => {
    function handler() {}
    function middleware1() {}
    function middleware2() {}

    describe('#contructor(route, method, handler)', () => {
        test('should create route for one method', () => {
            const route = new Route('/route', 'GET', handler);

            expect(route.name).toBe('/route');
            expect(route.route).toBe('/route');
            expect(route.pattern).toEqual(/^\/route(?:\/)?$/i);
            expect(route.tokens).toEqual([]);
            expect(route.methods).toEqual(['GET']);
            expect(route.handler).toBe(handler);
            expect(route.middlewareList).toEqual([]);
        });

        test('should create route for multiple methods', () => {
            const route = new Route('/route', ['GET', 'POST'], handler);

            expect(route.name).toBe('/route');
            expect(route.route).toBe('/route');
            expect(route.pattern).toEqual(/^\/route(?:\/)?$/i);
            expect(route.tokens).toEqual([]);
            expect(route.methods).toEqual(['GET', 'POST']);
            expect(route.handler).toBe(handler);
            expect(route.middlewareList).toEqual([]);
        });

        test('should create route with tokens', () => {
            const route = new Route('/user/:name', 'GET', handler);

            expect(route.name).toBe('/user/:name');
            expect(route.route).toBe('/user/:name');
            expect(route.pattern).toEqual(/^\/user\/([^/]+?)(?:\/)?$/i);
            expect(route.tokens).toEqual([
                {
                    delimiter: '/',
                    name: 'name',
                    optional: false,
                    partial: false,
                    pattern: '[^\\/]+?',
                    prefix: '/',
                    repeat: false
                }
            ]);
            expect(route.methods).toEqual(['GET']);
            expect(route.handler).toBe(handler);
            expect(route.middlewareList).toEqual([]);
        });
    });

    describe('#as(name)', () => {
        test('should create route with custom name', () => {
            const route = new Route('/route', 'GET', handler);

            route.as('route-name');

            expect(route.name).toBe('route-name');
            expect(route.route).toBe('/route');
            expect(route.pattern).toEqual(/^\/route(?:\/)?$/i);
            expect(route.tokens).toEqual([]);
            expect(route.methods).toEqual(['GET']);
            expect(route.handler).toBe(handler);
            expect(route.middlewareList).toEqual([]);
        });
    });

    describe('#middleware(middleware)', () => {
        test('should create route with one middleware', () => {
            const route = new Route('/route', 'GET', handler);

            route.middleware(middleware1);

            expect(route.name).toBe('/route');
            expect(route.route).toBe('/route');
            expect(route.pattern).toEqual(/^\/route(?:\/)?$/i);
            expect(route.tokens).toEqual([]);
            expect(route.methods).toEqual(['GET']);
            expect(route.handler).toBe(handler);
            expect(route.middlewareList).toEqual([middleware1]);
        });

        test('should create route with two middleware', () => {
            const route = new Route('/route', 'GET', handler);

            route.middleware([middleware1, middleware2]);

            expect(route.name).toBe('/route');
            expect(route.route).toBe('/route');
            expect(route.pattern).toEqual(/^\/route(?:\/)?$/i);
            expect(route.tokens).toEqual([]);
            expect(route.methods).toEqual(['GET']);
            expect(route.handler).toBe(handler);
            expect(route.middlewareList).toEqual([middleware1, middleware2]);
        });

        test('should add second middleware to route', () => {
            const route = new Route('/route', 'GET', handler);

            route.middleware(middleware1);
            route.middleware(middleware2);

            expect(route.name).toBe('/route');
            expect(route.route).toBe('/route');
            expect(route.pattern).toEqual(/^\/route(?:\/)?$/i);
            expect(route.tokens).toEqual([]);
            expect(route.methods).toEqual(['GET']);
            expect(route.handler).toBe(handler);
            expect(route.middlewareList).toEqual([middleware1, middleware2]);
        });
    });

    describe('#getRouteParams(route, path)', () => {
        test('should return params', () => {
            const route = new Route('/user/:name', 'GET', handler);
            const params = route.getRouteParams('/user/john-doe');

            expect(params).toEqual({
                name: 'john-doe'
            });
        });

        test('should return params with undefined name param', () => {
            const route = new Route('/user/:name', 'GET', handler);
            const params = route.getRouteParams('/user');

            expect(params).toEqual({
                name: undefined
            });
        });
    });
});

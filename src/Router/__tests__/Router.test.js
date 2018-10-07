import Router from '../Router';
import NotFoundException from '../Exceptions/NotFoundException';

describe('Router', () => {
    function handler() {}

    describe('#route(route, method, handler, name)', () => {
        test('should create route for one method', () => {
            const router = new Router();

            router.route('/route', 'GET', handler);

            expect(router.routes()).toEqual([
                {
                    name: null,
                    route: '/route',
                    pattern: /^\/route(?:\/)?$/i,
                    tokens: [],
                    params: {},
                    methods: ['GET'],
                    handler
                }
            ]);
        });

        test('should create route for multiple methods', () => {
            const router = new Router();

            router.route('/route', ['GET', 'POST'], handler);

            expect(router.routes()).toEqual([
                {
                    name: null,
                    route: '/route',
                    pattern: /^\/route(?:\/)?$/i,
                    tokens: [],
                    params: {},
                    methods: ['GET', 'POST'],
                    handler
                }
            ]);
        });

        test('should create named route', () => {
            const router = new Router();

            router.route('/route', 'GET', handler, 'route-name');

            expect(router.routes()).toEqual([
                {
                    name: 'route-name',
                    route: '/route',
                    pattern: /^\/route(?:\/)?$/i,
                    tokens: [],
                    params: {},
                    methods: ['GET'],
                    handler
                }
            ]);
        });

        test('should create route with tokens', () => {
            const router = new Router();

            router.route('/user/:name', 'GET', handler);

            expect(router.routes()).toEqual([
                {
                    name: null,
                    route: '/user/:name',
                    pattern: /^\/user\/([^/]+?)(?:\/)?$/i,
                    tokens: [
                        {
                            delimiter: '/',
                            name: 'name',
                            optional: false,
                            partial: false,
                            pattern: '[^\\/]+?',
                            prefix: '/',
                            repeat: false
                        }
                    ],
                    params: {},
                    methods: ['GET'],
                    handler
                }
            ]);
        });
    });

    describe('#get(route, handler, name)', () => {
        test('should create route for GET and HEAD methods', () => {
            const router = new Router();

            router.get('/route', handler);

            expect(router.routes()).toEqual([
                {
                    name: null,
                    route: '/route',
                    pattern: /^\/route(?:\/)?$/i,
                    tokens: [],
                    params: {},
                    methods: ['GET', 'HEAD'],
                    handler
                }
            ]);
        });

        test('should create named route for GET and HEAD methods', () => {
            const router = new Router();

            router.get('/route', handler, 'route-name');

            expect(router.routes()).toEqual([
                {
                    name: 'route-name',
                    route: '/route',
                    pattern: /^\/route(?:\/)?$/i,
                    tokens: [],
                    params: {},
                    methods: ['GET', 'HEAD'],
                    handler
                }
            ]);
        });
    });

    describe('#post(route, handler, name)', () => {
        test('should create route for POST method', () => {
            const router = new Router();

            router.post('/route', handler);

            expect(router.routes()).toEqual([
                {
                    name: null,
                    route: '/route',
                    pattern: /^\/route(?:\/)?$/i,
                    tokens: [],
                    params: {},
                    methods: ['POST'],
                    handler
                }
            ]);
        });

        test('should create named route for POST method', () => {
            const router = new Router();

            router.post('/route', handler, 'route-name');

            expect(router.routes()).toEqual([
                {
                    name: 'route-name',
                    route: '/route',
                    pattern: /^\/route(?:\/)?$/i,
                    tokens: [],
                    params: {},
                    methods: ['POST'],
                    handler
                }
            ]);
        });
    });

    describe('#put(route, handler, name)', () => {
        test('should create route for PUT method', () => {
            const router = new Router();

            router.put('/route', handler);

            expect(router.routes()).toEqual([
                {
                    name: null,
                    route: '/route',
                    pattern: /^\/route(?:\/)?$/i,
                    tokens: [],
                    params: {},
                    methods: ['PUT'],
                    handler
                }
            ]);
        });

        test('should create named route for PUT method', () => {
            const router = new Router();

            router.put('/route', handler, 'route-name');

            expect(router.routes()).toEqual([
                {
                    name: 'route-name',
                    route: '/route',
                    pattern: /^\/route(?:\/)?$/i,
                    tokens: [],
                    params: {},
                    methods: ['PUT'],
                    handler
                }
            ]);
        });
    });

    describe('#patch(route, handler, name)', () => {
        test('should create route for PATCH method', () => {
            const router = new Router();

            router.patch('/route', handler);

            expect(router.routes()).toEqual([
                {
                    name: null,
                    route: '/route',
                    pattern: /^\/route(?:\/)?$/i,
                    tokens: [],
                    params: {},
                    methods: ['PATCH'],
                    handler
                }
            ]);
        });

        test('should create named route for PATCH method', () => {
            const router = new Router();

            router.patch('/route', handler, 'route-name');

            expect(router.routes()).toEqual([
                {
                    name: 'route-name',
                    route: '/route',
                    pattern: /^\/route(?:\/)?$/i,
                    tokens: [],
                    params: {},
                    methods: ['PATCH'],
                    handler
                }
            ]);
        });
    });

    describe('#delete(route, handler, name)', () => {
        test('should create route for DELETE method', () => {
            const router = new Router();

            router.delete('/route', handler);

            expect(router.routes()).toEqual([
                {
                    name: null,
                    route: '/route',
                    pattern: /^\/route(?:\/)?$/i,
                    tokens: [],
                    params: {},
                    methods: ['DELETE'],
                    handler
                }
            ]);
        });

        test('should create named route for DELETE method', () => {
            const router = new Router();

            router.delete('/route', handler, 'route-name');

            expect(router.routes()).toEqual([
                {
                    name: 'route-name',
                    route: '/route',
                    pattern: /^\/route(?:\/)?$/i,
                    tokens: [],
                    params: {},
                    methods: ['DELETE'],
                    handler
                }
            ]);
        });
    });

    describe('#options(route, handler, name)', () => {
        test('should create route for OPTIONS method', () => {
            const router = new Router();

            router.options('/route', handler);

            expect(router.routes()).toEqual([
                {
                    name: null,
                    route: '/route',
                    pattern: /^\/route(?:\/)?$/i,
                    tokens: [],
                    params: {},
                    methods: ['OPTIONS'],
                    handler
                }
            ]);
        });

        test('should create named route for OPTIONS method', () => {
            const router = new Router();

            router.options('/route', handler, 'route-name');

            expect(router.routes()).toEqual([
                {
                    name: 'route-name',
                    route: '/route',
                    pattern: /^\/route(?:\/)?$/i,
                    tokens: [],
                    params: {},
                    methods: ['OPTIONS'],
                    handler
                }
            ]);
        });
    });

    describe('#match(route, methods, handler, name)', () => {
        test('should create route for GET method', () => {
            const router = new Router();

            router.match('/route', ['GET'], handler);

            expect(router.routes()).toEqual([
                {
                    name: null,
                    route: '/route',
                    pattern: /^\/route(?:\/)?$/i,
                    tokens: [],
                    params: {},
                    methods: ['GET'],
                    handler
                }
            ]);
        });

        test('should create named route for GET method', () => {
            const router = new Router();

            router.match('/route', ['GET'], handler, 'route-name');

            expect(router.routes()).toEqual([
                {
                    name: 'route-name',
                    route: '/route',
                    pattern: /^\/route(?:\/)?$/i,
                    tokens: [],
                    params: {},
                    methods: ['GET'],
                    handler
                }
            ]);
        });

        test('should create route for GET, POST and PUT methods', () => {
            const router = new Router();

            router.match('/route', ['GET', 'POST', 'PUT'], handler);

            expect(router.routes()).toEqual([
                {
                    name: null,
                    route: '/route',
                    pattern: /^\/route(?:\/)?$/i,
                    tokens: [],
                    params: {},
                    methods: ['GET', 'POST', 'PUT'],
                    handler
                }
            ]);
        });

        test('should create named route for GET, POST and PUT methods', () => {
            const router = new Router();

            router.match('/route', ['GET', 'POST', 'PUT'], handler, 'route-name');

            expect(router.routes()).toEqual([
                {
                    name: 'route-name',
                    route: '/route',
                    pattern: /^\/route(?:\/)?$/i,
                    tokens: [],
                    params: {},
                    methods: ['GET', 'POST', 'PUT'],
                    handler
                }
            ]);
        });
    });

    describe('#any(route, handler, name)', () => {
        test('should create route for GET, HEAD, POST, PUT, PATCH, DELETE and OPTIONS methods', () => {
            const router = new Router();

            router.any('/route', handler);

            expect(router.routes()).toEqual([
                {
                    name: null,
                    route: '/route',
                    pattern: /^\/route(?:\/)?$/i,
                    tokens: [],
                    params: {},
                    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
                    handler
                }
            ]);
        });

        test('should create named route for GET, HEAD, POST, PUT, PATCH, DELETE and OPTIONS methods', () => {
            const router = new Router();

            router.any('/route', handler, 'route-name');

            expect(router.routes()).toEqual([
                {
                    name: 'route-name',
                    route: '/route',
                    pattern: /^\/route(?:\/)?$/i,
                    tokens: [],
                    params: {},
                    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
                    handler
                }
            ]);
        });
    });

    describe('#routes()', () => {
        test('should return no routes', () => {
            const router = new Router();

            expect(router.routes()).toEqual([]);
        });

        test('should return one route', () => {
            const router = new Router();

            router.route('/route', 'GET', handler);

            expect(router.routes()).toEqual([
                {
                    name: null,
                    route: '/route',
                    pattern: /^\/route(?:\/)?$/i,
                    tokens: [],
                    params: {},
                    methods: ['GET'],
                    handler
                }
            ]);
        });

        test('should return two routes', () => {
            const router = new Router();

            router.route('/route1', 'GET', handler);
            router.route('/route2', 'POST', handler);

            expect(router.routes()).toEqual([
                {
                    name: null,
                    route: '/route1',
                    pattern: /^\/route1(?:\/)?$/i,
                    tokens: [],
                    params: {},
                    methods: ['GET'],
                    handler
                },
                {
                    name: null,
                    route: '/route2',
                    pattern: /^\/route2(?:\/)?$/i,
                    tokens: [],
                    params: {},
                    methods: ['POST'],
                    handler
                }
            ]);
        });
    });

    describe('#resolve(path, method)', () => {
        test('should return route', () => {
            const router = new Router();

            router.route('/route', 'GET', handler);

            expect(router.resolve('/route', 'GET')).toEqual({
                name: null,
                route: '/route',
                params: {},
                pattern: /^\/route(?:\/)?$/i,
                tokens: [],
                methods: ['GET'],
                handler
            });
        });

        test('should return route with params', () => {
            const router = new Router();

            router.route('/user/:name', 'GET', handler);

            expect(router.resolve('/user/johndoe', 'GET')).toEqual({
                name: null,
                route: '/user/:name',
                params: {
                    name: 'johndoe'
                },
                pattern: /^\/user\/([^/]+?)(?:\/)?$/i,
                tokens: [
                    {
                        delimiter: '/',
                        name: 'name',
                        optional: false,
                        partial: false,
                        pattern: '[^\\/]+?',
                        prefix: '/',
                        repeat: false
                    }
                ],
                methods: ['GET'],
                handler
            });
        });

        test('should return route with undefined name param', () => {
            const router = new Router();

            router.route('/user/:name?', 'GET', handler);

            expect(router.resolve('/user', 'GET')).toEqual({
                name: null,
                route: '/user/:name?',
                params: {
                    name: undefined
                },
                pattern: /^\/user(?:\/([^/]+?))?(?:\/)?$/i,
                tokens: [
                    {
                        delimiter: '/',
                        name: 'name',
                        optional: true,
                        partial: false,
                        pattern: '[^\\/]+?',
                        prefix: '/',
                        repeat: false
                    }
                ],
                methods: ['GET'],
                handler
            });
        });

        test('should throw NotFoundException because no route was found', () => {
            const router = new Router();

            router.route('/route', 'GET', handler);

            expect(() => {
                router.resolve('/foo/bar', 'GET');
            }).toThrow(NotFoundException);
        });

        test('should throw NotFoundException because route has not POST method', () => {
            const router = new Router();

            router.route('/route', 'GET', handler);

            expect(() => {
                router.resolve('/route', 'POST');
            }).toThrow(NotFoundException);
        });
    });
});

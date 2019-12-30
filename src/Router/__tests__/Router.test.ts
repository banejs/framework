import IRoute from '../types/IRoute';
import IRouter from '../types/IRouter';

import Route from '../Route';
import Router from '../Router';
import NotFoundException from '../Exceptions/NotFoundException';

describe('Router', () => {
    // tslint:disable-next-line
    function handler() {}

    describe('#route(route, method, handler, name)', () => {
        test('should return Route instance', () => {
            const router: IRouter = new Router();
            const route: IRoute = router.route('/route', 'GET', handler);

            expect(route).toBeInstanceOf(Route);
        });

        test('should create route for one method', () => {
            const router: IRouter = new Router();
            const route: IRoute = router.route('/route', 'GET', handler);

            expect(route.methods).toEqual(['GET']);
        });

        test('should create route for multiple methods', () => {
            const router: IRouter = new Router();
            const route: IRoute = router.route('/route', ['GET', 'POST'], handler);

            expect(route.methods).toEqual(['GET', 'POST']);
        });
    });

    describe('#get(route, handler, name)', () => {
        test('should return Route instance', () => {
            const router: IRouter = new Router();
            const route: IRoute = router.get('/route', handler);

            expect(route).toBeInstanceOf(Route);
        });

        test('should create route for GET and HEAD methods', () => {
            const router: IRouter = new Router();
            const route: IRoute = router.get('/route', handler);

            expect(route.methods).toEqual(['GET', 'HEAD']);
        });
    });

    describe('#post(route, handler, name)', () => {
        test('should return Route instance', () => {
            const router: IRouter = new Router();
            const route: IRoute = router.post('/route', handler);

            expect(route).toBeInstanceOf(Route);
        });

        test('should create route for POST method', () => {
            const router: IRouter = new Router();
            const route: IRoute = router.post('/route', handler);

            expect(route.methods).toEqual(['POST']);
        });
    });

    describe('#put(route, handler, name)', () => {
        test('should return Route instance', () => {
            const router: IRouter = new Router();
            const route: IRoute = router.put('/route', handler);

            expect(route).toBeInstanceOf(Route);
        });

        test('should create route for PUT method', () => {
            const router: IRouter = new Router();
            const route: IRoute = router.put('/route', handler);

            expect(route.methods).toEqual(['PUT']);
        });
    });

    describe('#patch(route, handler, name)', () => {
        test('should return Route instance', () => {
            const router: IRouter = new Router();
            const route: IRoute = router.patch('/route', handler);

            expect(route).toBeInstanceOf(Route);
        });

        test('should create route for POST method', () => {
            const router: IRouter = new Router();
            const route: IRoute = router.patch('/route', handler);

            expect(route.methods).toEqual(['PATCH']);
        });
    });

    describe('#delete(route, handler, name)', () => {
        test('should return Route instance', () => {
            const router: IRouter = new Router();
            const route: IRoute = router.delete('/route', handler);

            expect(route).toBeInstanceOf(Route);
        });

        test('should create route for POST method', () => {
            const router: IRouter = new Router();
            const route: IRoute = router.delete('/route', handler);

            expect(route.methods).toEqual(['DELETE']);
        });
    });

    describe('#options(route, handler, name)', () => {
        test('should return Route instance', () => {
            const router: IRouter = new Router();
            const route: IRoute = router.options('/route', handler);

            expect(route).toBeInstanceOf(Route);
        });

        test('should create route for POST method', () => {
            const router: IRouter = new Router();
            const route: IRoute = router.options('/route', handler);

            expect(route.methods).toEqual(['OPTIONS']);
        });
    });

    describe('#match(route, methods, handler, name)', () => {
        test('should return Route instance', () => {
            const router: IRouter = new Router();
            const route: IRoute = router.match('/route', ['GET', 'POST', 'PUT'], handler);

            expect(route).toBeInstanceOf(Route);
        });

        test('should create route for GET method', () => {
            const router: IRouter = new Router();
            const route: IRoute = router.match('/route', ['GET'], handler);

            expect(route.methods).toEqual(['GET']);
        });

        test('should create route for GET, POST and PUT methods', () => {
            const router: IRouter = new Router();
            const route: IRoute = router.match('/route', ['GET', 'POST', 'PUT'], handler);

            expect(route.methods).toEqual(['GET', 'POST', 'PUT']);
        });
    });

    describe('#any(route, handler, name)', () => {
        test('should return Route instance', () => {
            const router: IRouter = new Router();
            const route: IRoute = router.any('/route', handler);

            expect(route).toBeInstanceOf(Route);
        });

        test('should create route for GET, HEAD, POST, PUT, PATCH, DELETE and OPTIONS methods', () => {
            const router: IRouter = new Router();
            const route: IRoute = router.any('/route', handler);

            expect(route.methods).toEqual(['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']);
        });
    });

    describe('#routes()', () => {
        test('should return no routes', () => {
            const router: IRouter = new Router();

            expect(router.routes()).toEqual([]);
        });

        test('should return one route', () => {
            const router: IRouter = new Router();

            router.route('/route', 'GET', handler);

            expect(router.routes()).toHaveLength(1);
        });

        test('should return two routes', () => {
            const router: IRouter = new Router();

            router.route('/route1', 'GET', handler);
            router.route('/route2', 'POST', handler);

            expect(router.routes()).toHaveLength(2);
        });
    });

    describe('#resolve(path, method)', () => {
        test('should return route', () => {
            const router: IRouter = new Router();

            router.route('/route', 'GET', handler);

            expect(router.resolve('/route', 'GET')).toBeInstanceOf(Route);
        });

        test('should throw NotFoundException because no route was found', () => {
            const router: IRouter = new Router();

            router.route('/route', 'GET', handler);

            expect(() => {
                router.resolve('/foo/bar', 'GET');
            }).toThrow(NotFoundException);
        });

        test('should throw NotFoundException because route has not POST method', () => {
            const router: IRouter = new Router();

            router.route('/route', 'GET', handler);

            expect(() => {
                router.resolve('/route', 'POST');
            }).toThrow(NotFoundException);
        });
    });
});

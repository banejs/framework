import IRoute from '../types/IRoute';
import IRouter from '../types/IRouter';

import Route from '../Route';
import Router from '../Router';
import NotFoundException from '../Exceptions/NotFoundException';

describe('Router', (): void => {
    // tslint:disable-next-line
    function handler() {}

    describe('#route(route, method, handler, name)', (): void => {
        test('should return Route instance', (): void => {
            const router: IRouter = new Router();
            const route: IRoute = router.route('/route', 'GET', handler);

            expect(route).toBeInstanceOf(Route);
        });

        test('should create route for one method', (): void => {
            const router: IRouter = new Router();
            const route: IRoute = router.route('/route', 'GET', handler);

            expect(route.methods).toEqual(['GET']);
        });

        test('should create route for multiple methods', (): void => {
            const router: IRouter = new Router();
            const route: IRoute = router.route('/route', ['GET', 'POST'], handler);

            expect(route.methods).toEqual(['GET', 'POST']);
        });
    });

    describe('#get(route, handler, name)', (): void => {
        test('should return Route instance', (): void => {
            const router: IRouter = new Router();
            const route: IRoute = router.get('/route', handler);

            expect(route).toBeInstanceOf(Route);
        });

        test('should create route for GET and HEAD methods', (): void => {
            const router: IRouter = new Router();
            const route: IRoute = router.get('/route', handler);

            expect(route.methods).toEqual(['GET', 'HEAD']);
        });
    });

    describe('#post(route, handler, name)', (): void => {
        test('should return Route instance', (): void => {
            const router: IRouter = new Router();
            const route: IRoute = router.post('/route', handler);

            expect(route).toBeInstanceOf(Route);
        });

        test('should create route for POST method', (): void => {
            const router: IRouter = new Router();
            const route: IRoute = router.post('/route', handler);

            expect(route.methods).toEqual(['POST']);
        });
    });

    describe('#put(route, handler, name)', (): void => {
        test('should return Route instance', (): void => {
            const router: IRouter = new Router();
            const route: IRoute = router.put('/route', handler);

            expect(route).toBeInstanceOf(Route);
        });

        test('should create route for PUT method', (): void => {
            const router: IRouter = new Router();
            const route: IRoute = router.put('/route', handler);

            expect(route.methods).toEqual(['PUT']);
        });
    });

    describe('#patch(route, handler, name)', (): void => {
        test('should return Route instance', (): void => {
            const router: IRouter = new Router();
            const route: IRoute = router.patch('/route', handler);

            expect(route).toBeInstanceOf(Route);
        });

        test('should create route for POST method', (): void => {
            const router: IRouter = new Router();
            const route: IRoute = router.patch('/route', handler);

            expect(route.methods).toEqual(['PATCH']);
        });
    });

    describe('#delete(route, handler, name)', (): void => {
        test('should return Route instance', (): void => {
            const router: IRouter = new Router();
            const route: IRoute = router.delete('/route', handler);

            expect(route).toBeInstanceOf(Route);
        });

        test('should create route for POST method', (): void => {
            const router: IRouter = new Router();
            const route: IRoute = router.delete('/route', handler);

            expect(route.methods).toEqual(['DELETE']);
        });
    });

    describe('#options(route, handler, name)', (): void => {
        test('should return Route instance', (): void => {
            const router: IRouter = new Router();
            const route: IRoute = router.options('/route', handler);

            expect(route).toBeInstanceOf(Route);
        });

        test('should create route for POST method', (): void => {
            const router: IRouter = new Router();
            const route: IRoute = router.options('/route', handler);

            expect(route.methods).toEqual(['OPTIONS']);
        });
    });

    describe('#match(route, methods, handler, name)', (): void => {
        test('should return Route instance', (): void => {
            const router: IRouter = new Router();
            const route: IRoute = router.match('/route', ['GET', 'POST', 'PUT'], handler);

            expect(route).toBeInstanceOf(Route);
        });

        test('should create route for GET method', (): void => {
            const router: IRouter = new Router();
            const route: IRoute = router.match('/route', ['GET'], handler);

            expect(route.methods).toEqual(['GET']);
        });

        test('should create route for GET, POST and PUT methods', (): void => {
            const router: IRouter = new Router();
            const route: IRoute = router.match('/route', ['GET', 'POST', 'PUT'], handler);

            expect(route.methods).toEqual(['GET', 'POST', 'PUT']);
        });
    });

    describe('#any(route, handler, name)', (): void => {
        test('should return Route instance', (): void => {
            const router: IRouter = new Router();
            const route: IRoute = router.any('/route', handler);

            expect(route).toBeInstanceOf(Route);
        });

        test('should create route for GET, HEAD, POST, PUT, PATCH, DELETE and OPTIONS methods', (): void => {
            const router: IRouter = new Router();
            const route: IRoute = router.any('/route', handler);

            expect(route.methods).toEqual(['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']);
        });
    });

    describe('#routes()', (): void => {
        test('should return no routes', (): void => {
            const router: IRouter = new Router();

            expect(router.routes()).toEqual([]);
        });

        test('should return one route', (): void => {
            const router: IRouter = new Router();

            router.route('/route', 'GET', handler);

            expect(router.routes()).toHaveLength(1);
        });

        test('should return two routes', (): void => {
            const router: IRouter = new Router();

            router.route('/route1', 'GET', handler);
            router.route('/route2', 'POST', handler);

            expect(router.routes()).toHaveLength(2);
        });
    });

    describe('#resolve(path, method)', (): void => {
        test('should return route', (): void => {
            const router: IRouter = new Router();

            router.route('/route', 'GET', handler);

            expect(router.resolve('/route', 'GET')).toBeInstanceOf(Route);
        });

        test('should throw NotFoundException because no route was found', (): void => {
            const router: IRouter = new Router();

            router.route('/route', 'GET', handler);

            expect((): void => {
                router.resolve('/foo/bar', 'GET');
            }).toThrow(NotFoundException);
        });

        test('should throw NotFoundException because route has not POST method', (): void => {
            const router: IRouter = new Router();

            router.route('/route', 'GET', handler);

            expect((): void => {
                router.resolve('/route', 'POST');
            }).toThrow(NotFoundException);
        });
    });
});

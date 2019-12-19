import http from 'http';

import Koa from 'koa';
import escape from 'lodash/escape';
import Exception from '@banejs/exceptions/Exception';

import Server from '../Server';
import Router from '../../Router/Router';

describe('Server', () => {
    const env = {
        isDevelopment: false
    };

    const logger = {
        debug: jest.fn(),
        error: jest.fn()
    };

    describe('#app()', () => {
        test('should return Koa application instance', () => {
            const router = new Router();
            const server = new Server(env, logger, router);

            expect(server.app()).toBeInstanceOf(Koa);
        });
    });

    describe('#listen(host, port)', () => {
        test('should return 200', (done) => {
            const router = new Router();

            router.get('/', () => 'Hello, world!');

            const server = new Server(env, logger, router);
            const httpServer = server.listen('localhost', 3000, () => {
                http
                    .get('http://localhost:3000', (res) => {
                        expect(res.statusCode).toBe(200);
                        httpServer.close();
                        done();
                    })
                    .on('error', (err) => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err) => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should return 404', (done) => {
            const router = new Router();

            router.get('/', () => 'Hello, world!');

            const server = new Server(env, logger, router);
            const httpServer = server.listen('localhost', 3000, () => {
                http
                    .get('http://localhost:3000/404', (res) => {
                        expect(res.statusCode).toBe(404);
                        httpServer.close();
                        done();
                    })
                    .on('error', (err) => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err) => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should return 500', (done) => {
            const router = new Router();
            const error = new Error('some error');

            router.get('/', () => {
                throw error;
            });

            const server = new Server(env, logger, router);
            const httpServer = server.listen('localhost', 3000, () => {
                http
                    .get('http://localhost:3000/', (res) => {
                        expect(res.statusCode).toBe(500);
                        httpServer.close();
                        done();
                    })
                    .on('error', (err) => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err) => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should return "Hello, world!"', (done) => {
            const router = new Router();

            router.get('/', () => 'Hello, world!');

            const server = new Server(env, logger, router);
            const httpServer = server.listen('localhost', 3000, () => {
                http
                    .get('http://localhost:3000', (res) => {
                        let data = '';

                        res.on('data', (chunk) => {
                            data += chunk;
                        });

                        res.on('end', () => {
                            expect(data).toBe('Hello, world!');
                            httpServer.close();
                            done();
                        });
                    })
                    .on('error', (err) => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err) => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should register route middleware', (done) => {
            const router = new Router();

            router
                .get('/', () => 'Hello, world!')
                .middleware(async (ctx, next) => {
                    await next();
                    ctx.set('x-middleware-message', 'some message');
                });

            const server = new Server(env, logger, router);

            const httpServer = server.listen('localhost', 3000, () => {
                http
                    .get('http://localhost:3000', (res) => {
                        expect(res.headers['x-middleware-message']).toBe('some message');
                        httpServer.close();
                        done();
                    })
                    .on('error', (err) => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err) => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should register route array of middleware', (done) => {
            const router = new Router();

            router
                .get('/', () => 'Hello, world!')
                .middleware([
                    async (ctx, next) => {
                        await next();
                        ctx.set('x-middleware-message-1', 'some message 1');
                    },
                    async (ctx, next) => {
                        await next();
                        ctx.set('x-middleware-message-2', 'some message 2');
                    }
                ]);

            const server = new Server(env, logger, router);

            const httpServer = server.listen('localhost', 3000, () => {
                http
                    .get('http://localhost:3000', (res) => {
                        expect(res.headers['x-middleware-message-1']).toBe('some message 1');
                        expect(res.headers['x-middleware-message-2']).toBe('some message 2');
                        httpServer.close();
                        done();
                    })
                    .on('error', (err) => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err) => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should return "Internal Server Error"', (done) => {
            const router = new Router();
            const error = new Error('some error');

            router.get('/', () => {
                throw error;
            });

            const server = new Server(env, logger, router);
            const httpServer = server.listen('localhost', 3000, () => {
                http
                    .get('http://localhost:3000', (res) => {
                        let data = '';

                        res.on('data', (chunk) => {
                            data += chunk;
                        });

                        res.on('end', () => {
                            expect(data).toBe('Internal Server Error');
                            httpServer.close();
                            done();
                        });
                    })
                    .on('error', (err) => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err) => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should return error description for development environment', (done) => {
            const router = new Router();
            const error = new Exception('some error');

            router.get('/', () => {
                throw error;
            });

            const server = new Server({ isDevelopment: true }, logger, router);
            const httpServer = server.listen('localhost', 3000, () => {
                http
                    .get('http://localhost:3000', (res) => {
                        let data = '';

                        res.on('data', (chunk) => {
                            data += chunk;
                        });

                        res.on('end', () => {
                            expect(data).toBe(`<pre>${escape(error.stack)}</pre>`);
                            httpServer.close();
                            done();
                        });
                    })
                    .on('error', (err) => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err) => {
                httpServer.close();
                done.fail(err);
            });
        });
    });

    describe('#middleware(middleware)', () => {
        test('should register middleware', (done) => {
            const router = new Router();

            router.get('/', () => 'Hello, world!');

            const server = new Server(env, logger, router);

            server.middleware(async (ctx, next) => {
                await next();
                ctx.set('x-middleware-message', 'some message');
            });

            const httpServer = server.listen('localhost', 3000, () => {
                http
                    .get('http://localhost:3000', (res) => {
                        expect(res.headers['x-middleware-message']).toBe('some message');
                        httpServer.close();
                        done();
                    })
                    .on('error', (err) => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err) => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should register array of middleware', (done) => {
            const router = new Router();

            router.get('/', () => 'Hello, world!');

            const server = new Server(env, logger, router);

            server.middleware([
                async (ctx, next) => {
                    await next();
                    ctx.set('x-middleware-message-1', 'some message 1');
                },
                async (ctx, next) => {
                    await next();
                    ctx.set('x-middleware-message-2', 'some message 2');
                }
            ]);

            const httpServer = server.listen('localhost', 3000, () => {
                http
                    .get('http://localhost:3000', (res) => {
                        expect(res.headers['x-middleware-message-1']).toBe('some message 1');
                        expect(res.headers['x-middleware-message-2']).toBe('some message 2');
                        httpServer.close();
                        done();
                    })
                    .on('error', (err) => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err) => {
                httpServer.close();
                done.fail(err);
            });
        });
    });
});

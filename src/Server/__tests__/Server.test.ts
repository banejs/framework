import http, { Server as HttpServer, IncomingMessage } from 'http';

import Koa from 'koa';
import escape from 'lodash/escape';
import Exception from '@banejs/exceptions/Exception';
import ExceptionInterface from '@banejs/exceptions/types/ExceptionInterface';
import LoggerInterface from '@banejs/logger/types/LoggerInterface';

import EnvInterface from '../../Env/EnvInterface';
import ServerInterface from '../ServerInterface';
import RouterInterface from '../../Router/RouterInterface';

import Server from '../Server';
import Router from '../../Router/Router';

describe('Server', () => {
    const env: EnvInterface = {
        isDevelopment: false
    } as EnvInterface;

    const logger: LoggerInterface = {
        debug: jest.fn() as LoggerInterface['debug'],
        error: jest.fn() as LoggerInterface['error']
    } as LoggerInterface;

    describe('#app()', () => {
        test('should return Koa application instance', () => {
            const router: RouterInterface = new Router();
            const server: ServerInterface = new Server(env, logger, router);

            expect(server.app()).toBeInstanceOf(Koa);
        });
    });

    describe('#listen(host, port)', () => {
        test('should return 200', (done: jest.DoneCallback) => {
            const router: RouterInterface = new Router();

            router.get('/', () => 'Hello, world!');

            const server: ServerInterface = new Server(env, logger, router);
            const httpServer: HttpServer = server.listen('localhost', 3000, () => {
                http
                    .get('http://localhost:3000', (res: IncomingMessage) => {
                        expect(res.statusCode).toBe(200);
                        httpServer.close();
                        done();
                    })
                    .on('error', (err: Error) => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err: Error) => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should return 404', (done: jest.DoneCallback) => {
            const router: RouterInterface = new Router();

            router.get('/', () => 'Hello, world!');

            const server: ServerInterface = new Server(env, logger, router);
            const httpServer: HttpServer = server.listen('localhost', 3000, () => {
                http
                    .get('http://localhost:3000/404', (res: IncomingMessage) => {
                        expect(res.statusCode).toBe(404);
                        httpServer.close();
                        done();
                    })
                    .on('error', (err: Error) => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err: Error) => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should return 500', (done: jest.DoneCallback) => {
            const router: RouterInterface = new Router();
            const error: Error = new Error('some error');

            router.get('/', () => {
                throw error;
            });

            const server: ServerInterface = new Server(env, logger, router);
            const httpServer: HttpServer = server.listen('localhost', 3000, () => {
                http
                    .get('http://localhost:3000/', (res: IncomingMessage) => {
                        expect(res.statusCode).toBe(500);
                        httpServer.close();
                        done();
                    })
                    .on('error', (err: Error) => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err: Error) => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should return "Hello, world!"', (done: jest.DoneCallback) => {
            const router: RouterInterface = new Router();

            router.get('/', () => 'Hello, world!');

            const server: ServerInterface = new Server(env, logger, router);
            const httpServer: HttpServer = server.listen('localhost', 3000, () => {
                http
                    .get('http://localhost:3000', (res: IncomingMessage) => {
                        let data: string = '';

                        res.on('data', (chunk: string) => {
                            data += chunk;
                        });

                        res.on('end', () => {
                            expect(data).toBe('Hello, world!');
                            httpServer.close();
                            done();
                        });
                    })
                    .on('error', (err: Error) => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err: Error) => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should register route middleware', (done: jest.DoneCallback) => {
            const router: RouterInterface = new Router();

            router
                .get('/', () => 'Hello, world!')
                .middleware(async (ctx: Koa.Context, next: Koa.Next): Promise<void> => {
                    await next();
                    ctx.set('x-middleware-message', 'some message');
                });

            const server: ServerInterface = new Server(env, logger, router);

            const httpServer: HttpServer = server.listen('localhost', 3000, () => {
                http
                    .get('http://localhost:3000', (res: IncomingMessage) => {
                        expect(res.headers['x-middleware-message']).toBe('some message');
                        httpServer.close();
                        done();
                    })
                    .on('error', (err: Error) => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err: Error) => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should register route array of middleware', (done: jest.DoneCallback) => {
            const router: RouterInterface = new Router();

            router
                .get('/', () => 'Hello, world!')
                .middleware([
                    async (ctx: Koa.Context, next: Koa.Next): Promise<void> => {
                        await next();
                        ctx.set('x-middleware-message-1', 'some message 1');
                    },
                    async (ctx: Koa.Context, next: Koa.Next): Promise<void> => {
                        await next();
                        ctx.set('x-middleware-message-2', 'some message 2');
                    }
                ]);

            const server: ServerInterface = new Server(env, logger, router);

            const httpServer: HttpServer = server.listen('localhost', 3000, () => {
                http
                    .get('http://localhost:3000', (res: IncomingMessage) => {
                        expect(res.headers['x-middleware-message-1']).toBe('some message 1');
                        expect(res.headers['x-middleware-message-2']).toBe('some message 2');
                        httpServer.close();
                        done();
                    })
                    .on('error', (err: Error) => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err: Error) => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should return "Internal Server Error"', (done: jest.DoneCallback) => {
            const router: RouterInterface = new Router();
            const error: Error = new Error('some error');

            router.get('/', () => {
                throw error;
            });

            const server: ServerInterface = new Server(env, logger, router);
            const httpServer: HttpServer = server.listen('localhost', 3000, () => {
                http
                    .get('http://localhost:3000', (res: IncomingMessage) => {
                        let data: string = '';

                        res.on('data', (chunk: string) => {
                            data += chunk;
                        });

                        res.on('end', () => {
                            expect(data).toBe('Internal Server Error');
                            httpServer.close();
                            done();
                        });
                    })
                    .on('error', (err: Error) => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err: Error) => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should return error description for development environment', (done: jest.DoneCallback) => {
            const router: RouterInterface = new Router();
            const error: ExceptionInterface = new Exception('some error');
            const envDev: EnvInterface = { isDevelopment: true } as EnvInterface;

            router.get('/', () => {
                throw error;
            });

            const server: ServerInterface = new Server(envDev, logger, router);
            const httpServer: HttpServer = server.listen('localhost', 3000, () => {
                http
                    .get('http://localhost:3000', (res: IncomingMessage) => {
                        let data: string = '';

                        res.on('data', (chunk: string) => {
                            data += chunk;
                        });

                        res.on('end', () => {
                            expect(data).toBe(`<pre>${escape(error.stack)}</pre>`);
                            httpServer.close();
                            done();
                        });
                    })
                    .on('error', (err: Error) => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err: Error) => {
                httpServer.close();
                done.fail(err);
            });
        });
    });

    describe('#middleware(middleware)', () => {
        test('should register middleware', (done: jest.DoneCallback) => {
            const router: RouterInterface = new Router();

            router.get('/', () => 'Hello, world!');

            const server: ServerInterface = new Server(env, logger, router);

            server.middleware(async (ctx: Koa.Context, next: Koa.Next): Promise<void> => {
                await next();
                ctx.set('x-middleware-message', 'some message');
            });

            const httpServer: HttpServer = server.listen('localhost', 3000, () => {
                http
                    .get('http://localhost:3000', (res: IncomingMessage) => {
                        expect(res.headers['x-middleware-message']).toBe('some message');
                        httpServer.close();
                        done();
                    })
                    .on('error', (err: Error) => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err: Error) => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should register array of middleware', (done: jest.DoneCallback) => {
            const router: RouterInterface = new Router();

            router.get('/', () => 'Hello, world!');

            const server: ServerInterface = new Server(env, logger, router);

            server.middleware([
                async (ctx: Koa.Context, next: Koa.Next): Promise<void> => {
                    await next();
                    ctx.set('x-middleware-message-1', 'some message 1');
                },
                async (ctx: Koa.Context, next: Koa.Next): Promise<void> => {
                    await next();
                    ctx.set('x-middleware-message-2', 'some message 2');
                }
            ]);

            const httpServer: HttpServer = server.listen('localhost', 3000, () => {
                http
                    .get('http://localhost:3000', (res: IncomingMessage) => {
                        expect(res.headers['x-middleware-message-1']).toBe('some message 1');
                        expect(res.headers['x-middleware-message-2']).toBe('some message 2');
                        httpServer.close();
                        done();
                    })
                    .on('error', (err: Error) => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err: Error) => {
                httpServer.close();
                done.fail(err);
            });
        });
    });
});

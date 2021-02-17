import http, { Server as HttpServer, IncomingMessage } from 'http';

import Koa from 'koa';
import escape from 'lodash/escape';
import Exception from '@banejs/exceptions/Exception';
import IException from '@banejs/exceptions/types/IException';
import ILogger from '@banejs/logger/types/ILogger';

import IEnv from '../../Env/types/IEnv';
import IServer from '../types/IServer';
import IRouter from '../../Router/types/IRouter';

import Server from '../Server';
import Router from '../../Router/Router';

describe('Server', (): void => {
    const env: IEnv = {
        isDevelopment: false
    } as IEnv;

    const logger: ILogger = {
        debug: jest.fn() as ILogger['debug'],
        error: jest.fn() as ILogger['error']
    } as ILogger;

    describe('#app()', (): void => {
        test('should return Koa application instance', (): void => {
            const router: IRouter = new Router();
            const server: IServer = new Server(env, logger, router);

            expect(server.app()).toBeInstanceOf(Koa);
        });
    });

    describe('#listen(host, port)', (): void => {
        test('should return 200', (done: jest.DoneCallback): void => {
            const router: IRouter = new Router();

            router.get('/', (): string => 'Hello, world!');

            const server: IServer = new Server(env, logger, router);
            const httpServer: HttpServer = server.listen({ port: 3000, host: 'localhost' }, (): void => {
                http
                    .get('http://localhost:3000', (res: IncomingMessage): void => {
                        expect(res.statusCode).toBe(200);
                        httpServer.close();
                        done();
                    })
                    .on('error', (err: Error): void => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err: Error): void => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should return 404', (done: jest.DoneCallback): void => {
            const router: IRouter = new Router();

            router.get('/', (): string => 'Hello, world!');

            const server: IServer = new Server(env, logger, router);
            const httpServer: HttpServer = server.listen({ port: 3000, host: 'localhost' }, (): void => {
                http
                    .get('http://localhost:3000/404', (res: IncomingMessage): void => {
                        expect(res.statusCode).toBe(404);
                        httpServer.close();
                        done();
                    })
                    .on('error', (err: Error): void => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err: Error): void => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should return 500', (done: jest.DoneCallback): void => {
            const router: IRouter = new Router();
            const error: Error = new Error('some error');

            router.get('/', (): void => {
                throw error;
            });

            const server: IServer = new Server(env, logger, router);
            const httpServer: HttpServer = server.listen({ port: 3000, host: 'localhost' }, (): void => {
                http
                    .get('http://localhost:3000/', (res: IncomingMessage): void => {
                        expect(res.statusCode).toBe(500);
                        httpServer.close();
                        done();
                    })
                    .on('error', (err: Error): void => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err: Error): void => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should return "Hello, world!"', (done: jest.DoneCallback): void => {
            const router: IRouter = new Router();

            router.get('/', (): string => 'Hello, world!');

            const server: IServer = new Server(env, logger, router);
            const httpServer: HttpServer = server.listen({ port: 3000, host: 'localhost' }, (): void => {
                http
                    .get('http://localhost:3000', (res: IncomingMessage): void => {
                        let data: string = '';

                        res.on('data', (chunk: string): void => {
                            data += chunk;
                        });

                        res.on('end', (): void => {
                            expect(data).toBe('Hello, world!');
                            httpServer.close();
                            done();
                        });
                    })
                    .on('error', (err: Error): void => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err: Error): void => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should return "Global"', (done: jest.DoneCallback): void => {
            const router: IRouter = new Router();

            router.get('/api/:name', (): string => 'API');
            router.get('(.*)', (): string => 'Global');

            const server: IServer = new Server(env, logger, router);
            const httpServer: HttpServer = server.listen({ port: 3000, host: 'localhost' }, (): void => {
                http
                    .get('http://localhost:3000/global', (res: IncomingMessage): void => {
                        let data: string = '';

                        res.on('data', (chunk: string): void => {
                            data += chunk;
                        });

                        res.on('end', (): void => {
                            expect(data).toBe('Global');
                            httpServer.close();
                            done();
                        });
                    })
                    .on('error', (err: Error): void => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err: Error): void => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should return "API"', (done: jest.DoneCallback): void => {
            const router: IRouter = new Router();

            router.get('/api/:name', (): string => 'API');
            router.get('(.*)', (): string => 'Global');

            const server: IServer = new Server(env, logger, router);
            const httpServer: HttpServer = server.listen({ port: 3000, host: 'localhost' }, (): void => {
                http
                    .get('http://localhost:3000/api/foo', (res: IncomingMessage): void => {
                        let data: string = '';

                        res.on('data', (chunk: string): void => {
                            data += chunk;
                        });

                        res.on('end', (): void => {
                            expect(data).toBe('API');
                            httpServer.close();
                            done();
                        });
                    })
                    .on('error', (err: Error): void => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err: Error): void => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should return "API" for request with query', (done: jest.DoneCallback): void => {
            const router: IRouter = new Router();

            router.get('/api/:name', (): string => 'API');
            router.get('(.*)', (): string => 'Global');

            const server: IServer = new Server(env, logger, router);
            const httpServer: HttpServer = server.listen({ port: 3000, host: 'localhost' }, (): void => {
                http
                    .get('http://localhost:3000/api/foo?bar=baz', (res: IncomingMessage): void => {
                        let data: string = '';

                        res.on('data', (chunk: string): void => {
                            data += chunk;
                        });

                        res.on('end', (): void => {
                            expect(data).toBe('API');
                            httpServer.close();
                            done();
                        });
                    })
                    .on('error', (err: Error): void => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err: Error): void => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should register route middleware', (done: jest.DoneCallback): void => {
            const router: IRouter = new Router();

            router
                .get('/', (): string => 'Hello, world!')
                .middleware(async (ctx: Koa.Context, next: Koa.Next): Promise<void> => {
                    await next();
                    ctx.set('x-middleware-message', 'some message');
                });

            const server: IServer = new Server(env, logger, router);

            const httpServer: HttpServer = server.listen({ port: 3000, host: 'localhost' }, (): void => {
                http
                    .get('http://localhost:3000', (res: IncomingMessage): void => {
                        expect(res.headers['x-middleware-message']).toBe('some message');
                        httpServer.close();
                        done();
                    })
                    .on('error', (err: Error): void => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err: Error): void => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should register route middleware and return value from context', (done: jest.DoneCallback): void => {
            const router: IRouter = new Router();

            type ContextState = {
                foo: string;
            };

            router
                .get('/', (ctx: Koa.ParameterizedContext<ContextState>): string => `Hello, ${ctx.state.foo}!`)
                .middleware(async (ctx: Koa.ParameterizedContext<ContextState>, next: Koa.Next): Promise<void> => {
                    ctx.state.foo = 'bar';
                    await next();
                });

            const server: IServer = new Server(env, logger, router);

            const httpServer: HttpServer = server.listen({ port: 3000, host: 'localhost' }, (): void => {
                http
                    .get('http://localhost:3000', (res: IncomingMessage): void => {
                        let data: string = '';

                        res.on('data', (chunk: string): void => {
                            data += chunk;
                        });

                        res.on('end', (): void => {
                            expect(data).toBe('Hello, bar!');
                            httpServer.close();
                            done();
                        });
                    })
                    .on('error', (err: Error): void => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err: Error): void => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should register route array of middleware', (done: jest.DoneCallback): void => {
            const router: IRouter = new Router();

            router
                .get('/', (): string => 'Hello, world!')
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

            const server: IServer = new Server(env, logger, router);

            const httpServer: HttpServer = server.listen({ port: 3000, host: 'localhost' }, (): void => {
                http
                    .get('http://localhost:3000', (res: IncomingMessage): void => {
                        expect(res.headers['x-middleware-message-1']).toBe('some message 1');
                        expect(res.headers['x-middleware-message-2']).toBe('some message 2');
                        httpServer.close();
                        done();
                    })
                    .on('error', (err: Error): void => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err: Error): void => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should return "Internal Server Error"', (done: jest.DoneCallback): void => {
            const router: IRouter = new Router();
            const error: Error = new Error('some error');

            router.get('/', (): void => {
                throw error;
            });

            const server: IServer = new Server(env, logger, router);
            const httpServer: HttpServer = server.listen({ port: 3000, host: 'localhost' }, (): void => {
                http
                    .get('http://localhost:3000', (res: IncomingMessage): void => {
                        let data: string = '';

                        res.on('data', (chunk: string): void => {
                            data += chunk;
                        });

                        res.on('end', (): void => {
                            expect(data).toBe('Internal Server Error');
                            httpServer.close();
                            done();
                        });
                    })
                    .on('error', (err: Error): void => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err: Error): void => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should return error description for development environment', (done: jest.DoneCallback): void => {
            const router: IRouter = new Router();
            const error: IException = new Exception('some error');
            const envDev: IEnv = { isDevelopment: true } as IEnv;

            router.get('/', (): void => {
                throw error;
            });

            const server: IServer = new Server(envDev, logger, router);
            const httpServer: HttpServer = server.listen({ port: 3000, host: 'localhost' }, (): void => {
                http
                    .get('http://localhost:3000', (res: IncomingMessage): void => {
                        let data: string = '';

                        res.on('data', (chunk: string): void => {
                            data += chunk;
                        });

                        res.on('end', (): void => {
                            expect(data).toBe(`<pre>${escape(error.stack)}</pre>`);
                            httpServer.close();
                            done();
                        });
                    })
                    .on('error', (err: Error): void => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err: Error): void => {
                httpServer.close();
                done.fail(err);
            });
        });
    });

    describe('#middleware(middleware)', (): void => {
        test('should register middleware', (done: jest.DoneCallback): void => {
            const router: IRouter = new Router();

            router.get('/', (): string => 'Hello, world!');

            const server: IServer = new Server(env, logger, router);

            server.middleware(async (ctx: Koa.Context, next: Koa.Next): Promise<void> => {
                await next();
                ctx.set('x-middleware-message', 'some message');
            });

            const httpServer: HttpServer = server.listen({ port: 3000, host: 'localhost' }, (): void => {
                http
                    .get('http://localhost:3000', (res: IncomingMessage): void => {
                        expect(res.headers['x-middleware-message']).toBe('some message');
                        httpServer.close();
                        done();
                    })
                    .on('error', (err: Error): void => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err: Error): void => {
                httpServer.close();
                done.fail(err);
            });
        });

        test('should register array of middleware', (done: jest.DoneCallback): void => {
            const router: IRouter = new Router();

            router.get('/', (): string => 'Hello, world!');

            const server: IServer = new Server(env, logger, router);

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

            const httpServer: HttpServer = server.listen({ port: 3000, host: 'localhost' }, (): void => {
                http
                    .get('http://localhost:3000', (res: IncomingMessage): void => {
                        expect(res.headers['x-middleware-message-1']).toBe('some message 1');
                        expect(res.headers['x-middleware-message-2']).toBe('some message 2');
                        httpServer.close();
                        done();
                    })
                    .on('error', (err: Error): void => {
                        httpServer.close();
                        done.fail(err);
                    });
            });

            httpServer.on('error', (err: Error): void => {
                httpServer.close();
                done.fail(err);
            });
        });
    });
});

import { ListenOptions } from 'net';
import http from 'http';
import https from 'https';

import Koa from 'koa';
import koaCompose from 'koa-compose';
import escape from 'lodash/escape';

import ILogger from '@banejs/logger/types/ILogger';
import IException from '@banejs/exceptions/types/IException';
import IURLQuery from '@banejs/url/types/IURLQuery';

import IServer from './types/IServer';
import IEnv from '../Env/types/IEnv';
import IRoute from '../Router/types/IRoute';
import IRouter from '../Router/types/IRouter';
import IServerApplication from './types/IServerApplication';
import IServerApplicationContext from './types/IServerApplicationContext';
import IServerDefaultContextState from './types/IServerDefaultContextState';
import IServerListenOptions from './types/IServerListenOptions';
import { ServerApplicationNextType } from './types/ServerApplicationNextType';
import { MethodType } from '../Router/types/MethodType';
import { ServerApplicationMiddlewareType } from './types/ServerApplicationMiddlewareType';

import queryParse from '@banejs/url/queryParse';
import queryStringify from '@banejs/url/queryStringify';
import normalizeError from '@banejs/exceptions/lib/normalizeError';

import merge from '../lib/merge';
import isServerListenOptionsHttps from '../lib/isServerListenOptionsHttps';

export default class Server implements IServer {
    private env: IEnv;
    private logger: ILogger;
    private router: IRouter;
    private appInstance: IServerApplication;

    public constructor(env: IEnv, logger: ILogger, router: IRouter) {
        this.env = env;
        this.logger = logger;
        this.router = router;

        this.appInstance = this.rewriteKoaApp(new Koa());
    }

    private rewriteKoaApp(app: Koa): IServerApplication {
        this.rewriteKoaQueryString(app);

        return app as unknown as IServerApplication;
    }

    private rewriteKoaQueryString(app: Koa): void {
        merge(app.request, {
            get query(): IURLQuery {
                // @ts-ignore ignore the querystring missing error
                const str: string = this.querystring;
                // @ts-ignore ignore the _querycache missing error
                const cache: Record<string, IURLQuery> = this._querycache = this._querycache || {};

                return cache[str] || (cache[str] = queryParse(str));
            },
            set query(obj: IURLQuery) {
                // @ts-ignore ignore the querystring missing error
                this.querystring = queryStringify(obj);
            }
        });
    }

    /**
     * Request handler to respond to a given HTTP request.
     */
    private async handle<T extends IServerDefaultContextState = IServerDefaultContextState, S = Koa.DefaultState>(context: IServerApplicationContext<T, S>, next: ServerApplicationNextType): Promise<void> {
        try {
            const method: MethodType = context.method as MethodType;
            const route: IRoute = this.router.resolve(context.path, method);

            /**
             * Assign route path parameters to context state.
             */
            context.state.params = route.getRouteParams(context.path);

            /**
             * Apply middleware to request.
             */
            const middleware: ServerApplicationMiddlewareType<T, S> = koaCompose<IServerApplicationContext<T, S>>(route.middlewareList.concat(this.routeHandlerMiddleware(route)));

            await middleware(context, next);
        } catch (error) {
            const normalizedError: IException = normalizeError(error);

            context.status = normalizedError.status;

            if (this.env.isDevelopment) {
                context.type = 'text/html';
                context.body = `<pre>${escape(normalizedError.stack)}</pre>`;
            }

            this.logger.error(normalizedError);
        }
    }

    private routeHandlerMiddleware<T extends IServerDefaultContextState = IServerDefaultContextState, S = Koa.DefaultContext>(route: IRoute): ServerApplicationMiddlewareType<T, S> {
        return async (context: IServerApplicationContext<T, S>, next: ServerApplicationNextType): Promise<void> => {
            context.body = await route.handler(context);
            await next();
        };
    }

    /**
     * Returns Koa application.
     */
    public app(): IServerApplication {
        return this.appInstance;
    }

    /**
     * Registering middleware to run during every HTTP request to your application.
     */
    public middleware<T extends IServerDefaultContextState = IServerDefaultContextState, S = Koa.DefaultContext>(middleware: ServerApplicationMiddlewareType<T, S> | Array<ServerApplicationMiddlewareType<T, S>>): void {
        const middlewareList: Array<ServerApplicationMiddlewareType<T, S>> = Array.isArray(middleware) ? middleware : [middleware];

        middlewareList.forEach((m: ServerApplicationMiddlewareType<T, S>): void => {
            this.appInstance.use(m);
        });
    }

    /**
     * Starting a server on a given port and host.
     */
    public listen(options: IServerListenOptions, callback?: () => void): http.Server | https.Server {
        this.logger.debug('Waiting for server start...');
        this.appInstance.use<IServerDefaultContextState>(this.handle.bind(this));

        const isHttps: boolean = isServerListenOptionsHttps(options);
        const listenOptions: ListenOptions = {...options.listen};

        if (!listenOptions.path) {
            listenOptions.port = listenOptions.port || 3000;
        }

        listenOptions.host = listenOptions.host || 'localhost';

        const server: http.Server | https.Server = isHttps ? https.createServer(options.server || {}, this.appInstance.callback()) : http.createServer(options.server || {}, this.appInstance.callback());

        return server
            .listen(listenOptions, (): void => {
                if (listenOptions.port) {
                    this.logger.debug(`Serving app on ${isHttps ? 'https' : 'http'}://${listenOptions.host}:${listenOptions.port}/`);
                } else {
                    this.logger.debug(`Serving app on IPC path ${listenOptions.path}`);
                }

                if (typeof callback !== 'undefined') {
                    callback();
                }
            });
    }
}

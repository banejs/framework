import { ListenOptions } from 'net';
import { Server as HttpServer } from 'http';

import Koa from 'koa';
import koaCompose from 'koa-compose';
import escape from 'lodash/escape';

import ILogger from '@banejs/logger/types/ILogger';
import IException from '@banejs/exceptions/types/IException';

import IServer from './types/IServer';
import IEnv from '../Env/types/IEnv';
import IRoute from '../Router/types/IRoute';
import IRouter from '../Router/types/IRouter';
import { MethodType } from '../Router/types/MethodType';
import IServerDefaultContextState from './types/IServerDefaultContextState';

import normalizeError from '@banejs/exceptions/lib/normalizeError';

export default class Server implements IServer {
    private env: IEnv;
    private logger: ILogger;
    private router: IRouter;
    private appInstance: Koa = new Koa();

    public constructor(env: IEnv, logger: ILogger, router: IRouter) {
        this.env = env;
        this.logger = logger;
        this.router = router;
    }

    /**
     * Request handler to respond to a given HTTP request.
     */
    private async handle<T extends IServerDefaultContextState, S>(context: Koa.ParameterizedContext<T, S>, next: Koa.Next): Promise<void> {
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
            const middleware: Koa.Middleware<T, S> = koaCompose(route.middlewareList);

            await middleware(context, next);

            context.body = await route.handler(context);
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

    /**
     * Returns Koa application.
     */
    public app(): Koa {
        return this.appInstance;
    }

    /**
     * Registering middleware to run during every HTTP request to your application.
     */
    public middleware<T, S>(middleware: Koa.Middleware<T, S> | Array<Koa.Middleware<T, S>>): void {
        const middlewareList: Array<Koa.Middleware<T, S>> = Array.isArray(middleware) ? middleware : [middleware];

        middlewareList.forEach((m: Koa.Middleware<T, S>): void => {
            this.appInstance.use(m);
        });
    }

    /**
     * Starting a server on a given port and host.
     */
    public listen(options: ListenOptions, callback?: () => void): HttpServer {
        this.logger.debug('Waiting for server start...');
        this.appInstance.use<IServerDefaultContextState>(this.handle.bind(this));

        const preparedOptions: ListenOptions = {...options};

        if (!preparedOptions.path) {
            preparedOptions.port = preparedOptions.port || 3000;
        }

        preparedOptions.host = preparedOptions.host || 'localhost';

        return this.appInstance.listen(preparedOptions, () => {
            if (preparedOptions.port) {
                this.logger.debug(`Serving app on http://${preparedOptions.host}:${preparedOptions.port}/`);
            } else {
                this.logger.debug(`Serving app on IPC path ${preparedOptions.path}`);
            }

            if (typeof callback !== 'undefined') {
                callback();
            }
        });
    }
}

import Koa from 'koa';
import { Server as HttpServer } from 'http';
import escape from 'lodash/escape';

import ServerInterface from './ServerInterface';
import EnvInterface from '../Env/EnvInterface';
import LoggerInterface from '../Logger/LoggerInterface';
import RouterInterface from '../Router/RouterInterface';
import ExceptionInterface from '../Exceptions/ExceptionInterface';

import { RouteType } from '../Router/Types/RouteType';
import { MethodType } from '../Router/Types/MethodType';

import normalizeError from '../Exceptions/lib/normalizeError';

export default class Server implements ServerInterface {
    private env: EnvInterface;
    private logger: LoggerInterface;
    private router: RouterInterface;
    private appInstance: Koa = new Koa();

    /**
     * @param env - Dependency.
     * @param logger - Dependency.
     * @param router - Dependency.
     */
    public constructor(env: EnvInterface, logger: LoggerInterface, router: RouterInterface) {
        this.env = env;
        this.logger = logger;
        this.router = router;
    }

    /**
     * Request handler to respond to a given HTTP request.
     *
     * @param {Koa.Context} context
     *
     * @return {Promise.<void>}
     *
     * @private
     */
    private async handle(context: Koa.Context): Promise<void> {
        try {
            const method: MethodType = context.method as MethodType;
            const resolvedRoute: RouteType = this.router.resolve(context.url, method);

            /**
             * Assign route path parameters to context state.
             */
            context.state.params = resolvedRoute.params;
            context.body = await resolvedRoute.handler(context);
        } catch (error) {
            const normalizedError: ExceptionInterface = normalizeError(error);

            context.status = normalizedError.status;

            if (this.env.isDevelopment) {
                context.body = escape(error.stack);
            }

            this.logger.error(normalizedError);
        }
    }

    /**
     * Returns Koa application.
     *
     * @return {Koa}
     */
    public app(): Koa {
        return this.appInstance;
    }

    /**
     * Registering middleware to run during every HTTP request to your application.
     *
     * @param {Koa.Middleware|Array<Koa.Middleware>} middleware
     */
    public middleware(middleware: Koa.Middleware | Array<Koa.Middleware>): void {
        const middlewareList: Array<Koa.Middleware> = Array.isArray(middleware) ? middleware : [middleware];

        middlewareList.forEach((m: Koa.Middleware): void => {
            this.appInstance.use(m);
        });
    }

    /**
     * Starting a server on a given port and host.
     *
     * @param {string} [host='localhost']
     * @param {number} [port=3000]
     * @param {Function} [callback]
     *
     * @return {HttpServer}
     */
    public listen(host: string = 'localhost', port: number = 3000, callback?: Function): HttpServer {
        this.logger.debug('Waiting for server start...');
        this.appInstance.use(this.handle.bind(this));

        return this.appInstance.listen(port, host, () => {
            this.logger.debug('Serving app on http://{{host}}:{{port}}/', { host, port });

            if (typeof callback !== 'undefined') {
                callback();
            }
        });
    }
}

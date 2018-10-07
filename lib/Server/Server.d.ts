/// <reference types="node" />
import Koa from 'koa';
import { Server as HttpServer } from 'http';
import ServerInterface from './ServerInterface';
import EnvInterface from '../Env/EnvInterface';
import LoggerInterface from '../Logger/LoggerInterface';
import RouterInterface from '../Router/RouterInterface';
export default class Server implements ServerInterface {
    private env;
    private logger;
    private router;
    private appInstance;
    /**
     * @param env - Dependency.
     * @param logger - Dependency.
     * @param router - Dependency.
     */
    constructor(env: EnvInterface, logger: LoggerInterface, router: RouterInterface);
    /**
     * Request handler to respond to a given HTTP request.
     *
     * @param {Koa.Context} context
     *
     * @return {Promise.<void>}
     *
     * @private
     */
    private handle;
    /**
     * Returns Koa application.
     *
     * @return {Koa}
     */
    app(): Koa;
    /**
     * Registering middleware to run during every HTTP request to your application.
     *
     * @param {Koa.Middleware|Array<Koa.Middleware>} middleware
     */
    middleware(middleware: Koa.Middleware | Array<Koa.Middleware>): void;
    /**
     * Starting a server on a given port and host.
     *
     * @param {string} [host='localhost']
     * @param {number} [port=3000]
     * @param {Function} [callback]
     *
     * @return {HttpServer}
     */
    listen(host?: string, port?: number, callback?: Function): HttpServer;
}

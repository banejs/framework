import { Server as HttpServer } from 'http';

import ILogger from '@banejs/logger/types/ILogger';

import IEnv from '../Env/IEnv';
import IRouter from '../Router/IRouter';

interface IServer {
    /**
     * Returns server application.
     *
     * @return {*}
     */
    app(): any;

    /**
     * Registering middleware to run during every HTTP request to your application.
     *
     * @param {Function|Array<Function>} middleware
     */
    middleware(middleware: Function | Array<Function>): void;

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

interface IServerConstructor {
    new(env: IEnv, logger: ILogger, router: IRouter): IServer;
}

declare const IServer: IServerConstructor;

export default IServer;

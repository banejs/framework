import { Server as HttpServer } from 'http';

import EnvInterface from '../Env/EnvInterface';
import LoggerInterface from '../Logger/LoggerInterface';
import RouterInterface from '../Router/RouterInterface';

interface ServerInterface {
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

interface ServerInterfaceConstructor {
    new(env: EnvInterface, logger: LoggerInterface, router: RouterInterface): ServerInterface;
}

declare var ServerInterface: ServerInterfaceConstructor;

export default ServerInterface;

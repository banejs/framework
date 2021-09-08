import http from 'http';
import https from 'https';

import Koa from 'koa';

import ILogger from '@banejs/logger/types/ILogger';

import IEnv from '../../Env/types/IEnv';
import IRouter from '../../Router/types/IRouter';
import IServerApplication from './IServerApplication';
import IServerListenOptions from './IServerListenOptions';
import IServerDefaultContextState from './IServerDefaultContextState';
import { ServerApplicationMiddlewareType } from './ServerApplicationMiddlewareType';

interface IServer {
    /**
     * Returns server application.
     */
    app(): IServerApplication;

    /**
     * Registering middleware to run during every HTTP request to your application.
     */
    middleware<T extends IServerDefaultContextState = IServerDefaultContextState, S = Koa.DefaultContext>(middleware: ServerApplicationMiddlewareType<T, S> | Array<ServerApplicationMiddlewareType<T, S>>): void;

    /**
     * Starting a server on a given port and host.
     */
    listen(options: IServerListenOptions, callback?: () => void): http.Server | https.Server;
}

interface IServerConstructor {
    new(env: IEnv, logger: ILogger, router: IRouter): IServer;
}

declare const IServer: IServerConstructor;

export default IServer;

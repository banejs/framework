import { ServerOptions as HttpServerOptions } from 'http';

import IServerListenOptionsCommon from './IServerListenOptionsCommon';

export default interface IServerListenOptionsHttp extends IServerListenOptionsCommon {
    https?: false;
    server?: HttpServerOptions;
}

import { ServerOptions as HttpsServerOptions } from 'https';

import IServerListenOptionsCommon from './IServerListenOptionsCommon';

export default interface IServerListenOptionsHttps extends IServerListenOptionsCommon {
    https: true;
    server?: HttpsServerOptions;
}

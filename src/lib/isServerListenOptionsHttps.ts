import IServerListenOptions from '../Server/types/IServerListenOptions';
import IServerListenOptionsHttps from '../Server/types/IServerListenOptionsHttps';

export default function isServerListenOptionsHttps(options: IServerListenOptions): options is IServerListenOptionsHttps {
    return options.https === true;
}

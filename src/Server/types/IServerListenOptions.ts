import IServerListenOptionsHttp from './IServerListenOptionsHttp';
import IServerListenOptionsHttps from './IServerListenOptionsHttps';

type IServerListenOptions = IServerListenOptionsHttp | IServerListenOptionsHttps;

export default IServerListenOptions;

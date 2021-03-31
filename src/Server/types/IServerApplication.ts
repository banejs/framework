import Application, { DefaultContext } from 'koa';

import IServerApplicationRequest from './IServerApplicationRequest';
import IServerApplicationContext from './IServerApplicationContext';
import IServerDefaultContextState from './IServerDefaultContextState';

export default interface IServerApplication<StateT extends IServerDefaultContextState = IServerDefaultContextState, CustomT = DefaultContext> extends Omit<Application<StateT, CustomT>, 'request' | 'context'> {
    request: IServerApplicationRequest;
    context: IServerApplicationContext<StateT, CustomT>;
}

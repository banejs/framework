import { DefaultContext, ExtendableContext } from 'koa';

import IURLQuery from '@banejs/url/types/IURLQuery';

import IServerDefaultContextState from './IServerDefaultContextState';

type IServerApplicationContext<StateT extends IServerDefaultContextState = IServerDefaultContextState, CustomT = DefaultContext> = ExtendableContext & {
    state: StateT;
    query: IURLQuery;
} & CustomT;

export default IServerApplicationContext;

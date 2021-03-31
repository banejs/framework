import { DefaultContext } from 'koa';
import compose from 'koa-compose';

import IServerApplicationContext from './IServerApplicationContext';
import IServerDefaultContextState from './IServerDefaultContextState';

export type ServerApplicationMiddlewareType<StateT extends IServerDefaultContextState = IServerDefaultContextState, CustomT = DefaultContext> = compose.Middleware<IServerApplicationContext<StateT, CustomT>>;

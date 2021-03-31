import Koa from 'koa';

import IServerApplicationContext from '../../Server/types/IServerApplicationContext';
import IServerDefaultContextState from '../../Server/types/IServerDefaultContextState';

export type HandlerType<T extends IServerDefaultContextState = IServerDefaultContextState, S = Koa.DefaultContext> = (context: IServerApplicationContext<T, S>) => any;

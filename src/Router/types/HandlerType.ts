import Koa from 'koa';

export type HandlerType<T = Koa.DefaultState, S = Koa.DefaultContext> = (context: Koa.ParameterizedContext<T, S>) => any;

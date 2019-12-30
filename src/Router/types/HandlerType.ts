import Koa from 'koa';

export type HandlerType<T, S> = (context: Koa.ParameterizedContext<T, S>) => any;

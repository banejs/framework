import Koa from 'koa';

export type HandlerType = (context: Koa.ParameterizedContext) => any;

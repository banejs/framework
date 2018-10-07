import { MethodType } from './MethodType';
import { HandlerType } from './HandlerType';
import { ParamsType } from './ParamsType';
import { TokenType } from './TokenType';

export type RouteType = {
    name: string | null;
    route: string;
    pattern: RegExp;
    tokens: Array<TokenType>;
    params: ParamsType;
    methods: Array<MethodType>;
    handler: HandlerType;
};

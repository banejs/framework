import Exception from '@banejs/exceptions/Exception';

import IRouterException from './IRouterException';

/**
 * Base interface representing a generic exception in a router.
 */
export default class RouterException extends Exception implements IRouterException {
    public name: string = 'RouterException';

    public constructor(message?: string, code: string = 'E_ROUTER_EXCEPTION', status: number = 500) {
        super(message || 'Unexpected router exception', code, status);

        // Set the prototype explicitly.
        // @see https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Reflect.setPrototypeOf(this, RouterException.prototype);
    }
}

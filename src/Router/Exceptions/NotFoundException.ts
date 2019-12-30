import IRouterException from './IRouterException';

import RouterException from './RouterException';

/**
 * No entry was found in the router.
 */
export default class NotFoundException extends RouterException implements IRouterException {
    public name: string = 'NotFoundException';

    public constructor() {
        super('No entry was found in the router', 'E_ROUTER_NOT_FOUND', 404);

        // Set the prototype explicitly.
        // @see https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Reflect.setPrototypeOf(this, NotFoundException.prototype);
    }
}

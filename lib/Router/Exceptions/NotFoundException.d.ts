import RouterExceptionInterface from './RouterExceptionInterface';
import RouterException from './RouterException';
/**
 * No entry was found in the router.
 */
export default class NotFoundException extends RouterException implements RouterExceptionInterface {
    name: string;
    constructor();
}

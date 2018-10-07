import RouterExceptionInterface from './RouterExceptionInterface';
import Exception from '../../Exceptions/Exception';
/**
 * Base interface representing a generic exception in a router.
 */
export default class RouterException extends Exception implements RouterExceptionInterface {
    name: string;
    constructor(message?: string, code?: string, status?: number);
}

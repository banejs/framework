import ContainerExceptionInterface from './ContainerExceptionInterface';
import Exception from '../../Exceptions/Exception';
/**
 * Base interface representing a generic exception in a container.
 */
export default class ContainerException extends Exception implements ContainerExceptionInterface {
    name: string;
    constructor(message?: string, code?: string);
}

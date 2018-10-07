import ContainerExceptionInterface from './ContainerExceptionInterface';
import ContainerException from './ContainerException';
/**
 * No entry was found in the container.
 */
export default class NotFoundException extends ContainerException implements ContainerExceptionInterface {
    name: string;
    constructor();
}

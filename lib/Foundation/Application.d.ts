import ApplicationInterface from './ApplicationInterface';
import ContainerInterface from '../Container/ContainerInterface';
/**
 * @author Anton Drobot
 */
export default class Application implements ApplicationInterface {
    /**
     * Inversion of Control Container.
     *
     * @type {ContainerInterface}
     */
    container: ContainerInterface;
    /**
     * Create a new application instance.
     *
     * @param {ContainerInterface} container - Inversion of Control Container.
     */
    constructor(container: ContainerInterface);
    /**
     * Handles a request.
     *
     * @param {(container: ContainerInterface) => void} callback
     */
    handle(callback: (container: ContainerInterface) => void): void;
}

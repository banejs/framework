import ContainerInterface from '@banejs/container/types/ContainerInterface';

import IApplication from './IApplication';

/**
 * @author Anton Drobot
 */
export default class Application implements IApplication {
    /**
     * Inversion of Control Container.
     *
     * @type {ContainerInterface}
     */
    public container: ContainerInterface;

    /**
     * Create a new application instance.
     *
     * @param {ContainerInterface} container - Inversion of Control Container.
     */
    public constructor(container: ContainerInterface) {
        this.container = container;
    }

    /**
     * Handles a request.
     *
     * @param {(container: ContainerInterface) => void} callback
     */
    public handle(callback: (container: ContainerInterface) => void): void {
        callback(this.container);
    }
}

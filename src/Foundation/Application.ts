import IContainer from '@banejs/container/types/IContainer';

import IApplication from './IApplication';

/**
 * @author Anton Drobot
 */
export default class Application implements IApplication {
    /**
     * Inversion of Control Container.
     *
     * @type {IContainer}
     */
    public container: IContainer;

    /**
     * Create a new application instance.
     *
     * @param {IContainer} container - Inversion of Control Container.
     */
    public constructor(container: IContainer) {
        this.container = container;
    }

    /**
     * Handles a request.
     *
     * @param {(container: IContainer) => void} callback
     */
    public handle(callback: (container: IContainer) => void): void {
        callback(this.container);
    }
}

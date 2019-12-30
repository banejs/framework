import ContainerInterface from '@banejs/container/types/ContainerInterface';

interface IApplication {
    /**
     * Inversion of Control Container.
     *
     * @type {ContainerInterface}
     */
    container: ContainerInterface;

    /**
     * Handles a request.
     *
     * @param {(container: ContainerInterface) => void} callback
     */
    handle(callback: (container: ContainerInterface) => void): void;
}

interface IApplicationConstructor {
    /**
     * Create a new application instance.
     *
     * @param {ContainerInterface} container - Inversion of Control Container.
     */
    new(container: ContainerInterface): IApplication;
}

declare const IApplication: IApplicationConstructor;

export default IApplication;

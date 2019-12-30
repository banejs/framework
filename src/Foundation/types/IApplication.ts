import IContainer from '@banejs/container/types/IContainer';

interface IApplication {
    /**
     * Inversion of Control Container.
     *
     * @type {IContainer}
     */
    container: IContainer;

    /**
     * Handles a request.
     *
     * @param {(container: IContainer) => void} callback
     */
    handle(callback: (container: IContainer) => void): void;
}

interface IApplicationConstructor {
    /**
     * Create a new application instance.
     *
     * @param {IContainer} container - Inversion of Control Container.
     */
    new(container: IContainer): IApplication;
}

declare const IApplication: IApplicationConstructor;

export default IApplication;

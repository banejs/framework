import ContainerInterface from '../Container/ContainerInterface';

interface ApplicationInterface {
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

interface ApplicationInterfaceConstructor {
    /**
     * Create a new application instance.
     *
     * @param {ContainerInterface} container - Inversion of Control Container.
     */
    new(container: ContainerInterface): ApplicationInterface;
}

declare var ApplicationInterface: ApplicationInterfaceConstructor;

export default ApplicationInterface;

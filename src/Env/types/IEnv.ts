export default interface IEnv {
    /**
     * Current environment.
     */
    environment: string;

    /**
     * Is development environment.
     */
    isDevelopment: boolean;

    /**
     * Is development environment.
     */
    isTesting: boolean;

    /**
     * Is production environment.
     */
    isProduction: boolean;
}

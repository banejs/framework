import EnvInterface from './EnvInterface';
export default class Env implements EnvInterface {
    /**
     * Current environment.
     *
     * @type {string}
     */
    environment: string;
    /**
     * Is development environment.
     *
     * @type {boolean}
     */
    isDevelopment: boolean;
    /**
     * Is development environment.
     *
     * @type {boolean}
     */
    isTesting: boolean;
    /**
     * Is production environment.
     *
     * @type {boolean}
     */
    isProduction: boolean;
    /**
     * Is server side.
     *
     * @type {boolean}
     */
    isServerSide: boolean;
    /**
     * Is client side.
     *
     * @type {boolean}
     */
    isClientSide: boolean;
}

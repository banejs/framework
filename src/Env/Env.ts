import EnvInterface from './EnvInterface';

export default class Env implements EnvInterface {
    /**
     * Current environment.
     *
     * @type {string}
     */
    public environment: string = (process && process.env && process.env.NODE_ENV) || 'development';

    /**
     * Is development environment.
     *
     * @type {boolean}
     */
    public isDevelopment: boolean = this.environment === 'development';

    /**
     * Is development environment.
     *
     * @type {boolean}
     */
    public isTesting: boolean = this.environment === 'testing';

    /**
     * Is production environment.
     *
     * @type {boolean}
     */
    public isProduction: boolean = this.environment === 'production';

    /**
     * Is server side.
     *
     * @type {boolean}
     */
    public isServerSide: boolean = typeof process !== 'undefined' && process.versions !== null && process.versions.node !== null;

    /**
     * Is client side.
     *
     * @type {boolean}
     */
    public isClientSide: boolean = typeof window !== 'undefined' && typeof window.document !== 'undefined';
}

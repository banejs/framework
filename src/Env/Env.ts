import IEnv from './types/IEnv';

export default class Env implements IEnv {
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
}

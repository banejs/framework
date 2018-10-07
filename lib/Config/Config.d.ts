import ConfigInterface from './ConfigInterface';
/**
 * Manage configuration for an application by adding config objects.
 *
 * @author Anton Drobot
 */
export default class Config implements ConfigInterface {
    /**
     * Config store.
     *
     * @type {Object}
     *
     * @private
     */
    private config;
    has(id: string): boolean;
    get(id?: string, defaultValue?: any): any;
    set(id: string, value: any): void;
}

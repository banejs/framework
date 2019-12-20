import has from 'lodash/has';
import get from 'lodash/get';
import set from 'lodash/set';

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
    private config: object = {};

    public has(id: string): boolean {
        return has(this.config, id);
    }

    public get(id?: string, defaultValue?: any): any {
        if (typeof id === 'undefined') {
            return this.config;
        }

        return get(this.config, id, defaultValue);
    }

    public set(id: string, value: any): void {
        set(this.config, id, value);
    }
}

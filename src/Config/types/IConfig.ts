export default interface IConfig {
    /**
     * Returns true if the store config can return an entry for the given identifier.
     * Returns false otherwise.
     *
     * @param {string} id
     *
     * @return {boolean}
     */
    has(id: string): boolean;

    /**
     * Get value for a given identifier from config store.
     *
     * @param {string} [id] - Configuration identifier to return value for.
     * @param {*} [defaultValue] - Default value to return when actual value is undefined.
     *
     * @return {*}
     */
    get(id?: string, defaultValue?: any): any;

    /**
     * Set or update value for a given identifier inside config store.
     *
     * @param {string} id - Identifier to set value for.
     * @param {*} value - Value to be saved next to defined identifier.
     */
    set(id: string, value: any): void;
}

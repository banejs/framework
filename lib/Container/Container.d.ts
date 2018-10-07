import ContainerInterface from './ContainerInterface';
import { CreatorType, DefaultCreatorType, FactoryCreatorType, ConstantCreatorType } from './Types/CreatorTypes';
/**
 * Inversion of Control Container.
 *
 * @author Anton Drobot
 */
export default class Container implements ContainerInterface {
    /**
     * The container's bindings.
     *
     * @type {Map<string, BindingType>}
     *
     * @private
     */
    private bindings;
    /**
     * The container's shared instances.
     *
     * @type {Map<string, *>}
     *
     * @private
     */
    private instances;
    /**
     * The registered type aliases.
     *
     * @type {Map<string, string>}
     *
     * @private
     */
    private aliases;
    /**
     * Register a binding with the container.
     *
     * @param {string} id
     * @param {CreatorType} creator
     * @param {boolean} [shared=false]
     * @param {boolean} [constant=false]
     *
     * @private
     */
    private baseBind;
    /**
     * Instantiate a concrete instance of the given type.
     *
     * @throws {ContainerException} - Error while retrieving the entry.
     *
     * @param {BindingType} binding
     *
     * @return {*}
     *
     * @private
     */
    private build;
    /**
     * Resolve the given type from the container.
     *
     * @throws {NotFoundException} - No entry was found for **this** identifier.
     *
     * @param {string} id
     *
     * @return {Function}
     *
     * @private
     */
    private resolve;
    /**
     * Finds an entry of the container by its identifier and returns it.
     *
     * @param {string} id - Identifier of the entry to look for.
     *
     * @return {*}
     */
    get(id: string): any;
    /**
     * Returns true if the container can return an entry for the given identifier.
     * Returns false otherwise.
     *
     * @param {string} id - Identifier of the entry to look for.
     *
     * @return {boolean}
     */
    has(id: string): boolean;
    /**
     * Binds an abstraction.
     *
     * @param {string} id
     * @param {CreatorType} creator
     */
    bind(id: string, creator: CreatorType): void;
    /**
     * Binds an abstraction to a singleton.
     *
     * @param {string} id
     * @param {DefaultCreatorType} creator
     */
    singleton(id: string, creator: DefaultCreatorType): void;
    /**
     * Binds an abstraction to a factory.
     *
     * @param {string} id
     * @param {FactoryCreatorType} creator
     */
    factory(id: string, creator: FactoryCreatorType): void;
    /**
     * Binds an abstraction to a constant value
     *
     * @param {string} id
     * @param {ConstantCreatorType} constant
     */
    constant(id: string, constant: ConstantCreatorType): void;
    /**
     * Alias a type to a different name.
     *
     * @param {string} id
     * @param {string} alias
     */
    alias(id: string, alias: string): void;
}

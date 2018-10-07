"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _NotFoundException = _interopRequireDefault(require("./Exceptions/NotFoundException"));

var _ContainerException = _interopRequireDefault(require("./Exceptions/ContainerException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Inversion of Control Container.
 *
 * @author Anton Drobot
 */
class Container {
  constructor() {
    _defineProperty(this, "bindings", new Map());

    _defineProperty(this, "instances", new Map());

    _defineProperty(this, "aliases", new Map());
  }

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
  baseBind(id, creator, {
    shared = false,
    constant = false
  } = {}) {
    this.bindings.set(id, {
      creator,
      shared,
      constant
    });
  }
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


  build(binding) {
    try {
      if (binding.constant) {
        return binding.creator;
      }

      return Reflect.apply(binding.creator, undefined, [this]);
    } catch (error) {
      throw new _ContainerException.default(error.message);
    }
  }
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


  resolve(id) {
    const aliasOrId = this.aliases.get(id) || id;

    if (this.instances.has(aliasOrId)) {
      return this.instances.get(aliasOrId);
    }

    const binding = this.bindings.get(aliasOrId);

    if (!binding) {
      throw new _NotFoundException.default();
    }

    const object = this.build(binding);

    if (binding.shared) {
      this.instances.set(aliasOrId, object);
    }

    return object;
  }
  /**
   * Finds an entry of the container by its identifier and returns it.
   *
   * @param {string} id - Identifier of the entry to look for.
   *
   * @return {*}
   */


  get(id) {
    return this.resolve(id);
  }
  /**
   * Returns true if the container can return an entry for the given identifier.
   * Returns false otherwise.
   *
   * @param {string} id - Identifier of the entry to look for.
   *
   * @return {boolean}
   */


  has(id) {
    const aliasOrId = this.aliases.get(id) || id;
    return this.bindings.has(aliasOrId) || this.instances.has(aliasOrId);
  }
  /**
   * Binds an abstraction.
   *
   * @param {string} id
   * @param {CreatorType} creator
   */


  bind(id, creator) {
    this.baseBind(id, creator);
  }
  /**
   * Binds an abstraction to a singleton.
   *
   * @param {string} id
   * @param {DefaultCreatorType} creator
   */


  singleton(id, creator) {
    this.baseBind(id, creator, {
      shared: true
    });
  }
  /**
   * Binds an abstraction to a factory.
   *
   * @param {string} id
   * @param {FactoryCreatorType} creator
   */


  factory(id, creator) {
    this.baseBind(id, creator);
  }
  /**
   * Binds an abstraction to a constant value
   *
   * @param {string} id
   * @param {ConstantCreatorType} constant
   */


  constant(id, constant) {
    this.baseBind(id, constant, {
      constant: true
    });
  }
  /**
   * Alias a type to a different name.
   *
   * @param {string} id
   * @param {string} alias
   */


  alias(id, alias) {
    this.aliases.set(alias, id);
  }

}

exports.default = Container;
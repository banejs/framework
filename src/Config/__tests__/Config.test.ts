import IConfig from '../IConfig';

import Config from '../Config';

describe('Config', () => {
    describe('#set(id, value)', () => {
        test('should create foo property in store', () => {
            const config: IConfig = new Config();

            config.set('foo', 'bar');

            expect(config.get()).toEqual({ foo: 'bar' });
        });

        test('should replace foo property in store', () => {
            const config: IConfig = new Config();

            config.set('foo', 'bar');

            expect(config.get()).toEqual({ foo: 'bar' });

            config.set('foo', 'baz');

            expect(config.get()).toEqual({ foo: 'baz' });
        });
    });

    describe('#get(id, defaultValue)', () => {
        test('should return value for property', () => {
            const config: IConfig = new Config();

            config.set('foo', 'bar');

            expect(config.get('foo')).toBe('bar');
        });

        test('should return default value for property if it does not exists in config', () => {
            const config: IConfig = new Config();

            expect(config.get('foo', 'bar')).toBe('bar');
        });

        test('should return the entire configuration object if the property is not provided', () => {
            const config: IConfig = new Config();

            config.set('foo', 'bar');

            expect(config.get()).toEqual({ foo: 'bar' });
        });

        test('should return value at path of config', () => {
            const config: IConfig = new Config();

            config.set('foo', { bar: 'baz' });

            expect(config.get('foo.bar')).toBe('baz');
        });

        test('should return default value for path if it does not exists in config', () => {
            const config: IConfig = new Config();

            config.set('foo', { bar: 'baz' });

            expect(config.get('foo.foo', 'default value')).toBe('default value');
        });

        test('should return second value of array at path of config', () => {
            const config: IConfig = new Config();

            config.set('foo', ['first', 'second', 'third']);

            expect(config.get('foo[1]')).toBe('second');
        });
    });

    describe('#has(id)', () => {
        test('should return true', () => {
            const config: IConfig = new Config();

            config.set('foo', 'bar');

            expect(config.has('foo')).toBe(true);
        });

        test('should return false', () => {
            const config: IConfig = new Config();

            expect(config.has('foo')).toBe(false);
        });
    });
});

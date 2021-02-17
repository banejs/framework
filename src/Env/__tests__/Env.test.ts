import IEnv from '../types/IEnv';

import Env from '../Env';

describe('Env', (): void => {
    describe('environment', (): void => {
        test('should use unexpected environment', (): void => {
            const originalNodeEnv: string | undefined = process.env.NODE_ENV;

            process.env.NODE_ENV = 'unexpected';

            const env: IEnv = new Env();

            expect(env.environment).toBe('unexpected');
            expect(env.isDevelopment).toBe(false);
            expect(env.isTesting).toBe(false);
            expect(env.isProduction).toBe(false);

            process.env.NODE_ENV = originalNodeEnv;
        });

        test('should use development environment', (): void => {
            const originalNodeEnv: string | undefined = process.env.NODE_ENV;

            process.env.NODE_ENV = 'development';

            const env: IEnv = new Env();

            expect(env.environment).toBe('development');
            expect(env.isDevelopment).toBe(true);
            expect(env.isTesting).toBe(false);
            expect(env.isProduction).toBe(false);

            process.env.NODE_ENV = originalNodeEnv;
        });

        test('should use development environment when NODE_ENV is not provided', (): void => {
            const originalNodeEnv: string | undefined = process.env.NODE_ENV;

            delete process.env.NODE_ENV;

            const env: IEnv = new Env();

            expect(env.environment).toBe('development');
            expect(env.isDevelopment).toBe(true);
            expect(env.isTesting).toBe(false);
            expect(env.isProduction).toBe(false);

            process.env.NODE_ENV = originalNodeEnv;
        });

        test('should use testing environment', (): void => {
            const originalNodeEnv: string | undefined = process.env.NODE_ENV;

            process.env.NODE_ENV = 'testing';

            const env: IEnv = new Env();

            expect(env.environment).toBe('testing');
            expect(env.isDevelopment).toBe(false);
            expect(env.isTesting).toBe(true);
            expect(env.isProduction).toBe(false);

            process.env.NODE_ENV = originalNodeEnv;
        });

        test('should use production environment', (): void => {
            const originalNodeEnv: string | undefined = process.env.NODE_ENV;

            process.env.NODE_ENV = 'production';

            const env: IEnv = new Env();

            expect(env.environment).toBe('production');
            expect(env.isDevelopment).toBe(false);
            expect(env.isTesting).toBe(false);
            expect(env.isProduction).toBe(true);

            process.env.NODE_ENV = originalNodeEnv;
        });
    });
});

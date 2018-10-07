import Env from '../Env';

describe('Env', () => {
    describe('environment', () => {
        test('should use unexpected environment', () => {
            const originalNodeEnv = process.env.NODE_ENV;

            process.env.NODE_ENV = 'unexpected';

            const env = new Env();

            expect(env.environment).toBe('unexpected');
            expect(env.isDevelopment).toBe(false);
            expect(env.isTesting).toBe(false);
            expect(env.isProduction).toBe(false);

            process.env.NODE_ENV = originalNodeEnv;
        });

        test('should use development environment', () => {
            const originalNodeEnv = process.env.NODE_ENV;

            process.env.NODE_ENV = 'development';

            const env = new Env();

            expect(env.environment).toBe('development');
            expect(env.isDevelopment).toBe(true);
            expect(env.isTesting).toBe(false);
            expect(env.isProduction).toBe(false);

            process.env.NODE_ENV = originalNodeEnv;
        });

        test('should use development environment when NODE_ENV is not provided', () => {
            const originalNodeEnv = process.env.NODE_ENV;

            delete process.env.NODE_ENV;

            const env = new Env();

            expect(env.environment).toBe('development');
            expect(env.isDevelopment).toBe(true);
            expect(env.isTesting).toBe(false);
            expect(env.isProduction).toBe(false);

            process.env.NODE_ENV = originalNodeEnv;
        });

        test('should use testing environment', () => {
            const originalNodeEnv = process.env.NODE_ENV;

            process.env.NODE_ENV = 'testing';

            const env = new Env();

            expect(env.environment).toBe('testing');
            expect(env.isDevelopment).toBe(false);
            expect(env.isTesting).toBe(true);
            expect(env.isProduction).toBe(false);

            process.env.NODE_ENV = originalNodeEnv;
        });

        test('should use production environment', () => {
            const originalNodeEnv = process.env.NODE_ENV;

            process.env.NODE_ENV = 'production';

            const env = new Env();

            expect(env.environment).toBe('production');
            expect(env.isDevelopment).toBe(false);
            expect(env.isTesting).toBe(false);
            expect(env.isProduction).toBe(true);

            process.env.NODE_ENV = originalNodeEnv;
        });
    });

    describe('isServerSide', () => {
        test('should return true', () => {
            const env = new Env();

            expect(env.isServerSide).toBe(true);
        });

        test('should return false', () => {
            const originalProcess = process;

            global.process = undefined;

            const env = new Env();

            expect(env.isServerSide).toBe(false);

            global.process = originalProcess;
        });
    });

    describe('isClientSide', () => {
        test('should return true', () => {
            global.window = { document: {} };

            const env = new Env();

            expect(env.isClientSide).toBe(true);

            global.window = undefined;
        });

        test('should return false', () => {
            const env = new Env();

            expect(env.isClientSide).toBe(false);
        });
    });
});

import Exception from '../Exception';

describe('Exception', () => {
    describe('#constructor(message, code, status, data)', () => {
        test('should create instance of an Error and Exception', () => {
            const e = new Exception();

            expect(e).toBeInstanceOf(Error);
            expect(e).toBeInstanceOf(Exception);
        });

        test('should create instance with default parameters', () => {
            const e = new Exception();

            expect(e.message).toBe('Internal error');
            expect(e.name).toBe('Exception');
            expect(e.code).toBe('E_INTERNAL_ERROR');
            expect(e.status).toBe(500);
            expect(e.data).toEqual({});
            expect(typeof e.stack).toBe('string');
        });

        test('should create instance with user-defined parameters', () => {
            const data = { foo: 'bar' };
            const e = new Exception('Not Found', 'E_NOT_FOUND', 404, data);

            expect(e.message).toBe('Not Found');
            expect(e.name).toBe('Exception');
            expect(e.code).toBe('E_NOT_FOUND');
            expect(e.status).toBe(404);
            expect(e.data).toBe(data);
            expect(typeof e.stack).toBe('string');
        });
    });

    describe('#toJSON()', () => {
        test('should return object with default parameters', () => {
            const e = new Exception();

            expect(e.toJSON()).toEqual({
                name: 'Exception',
                message: 'Internal error',
                code: 'E_INTERNAL_ERROR',
                status: 500,
                data: {}
            });
        });

        test('should return object with user-defined parameters', () => {
            const data = { foo: 'bar' };
            const e = new Exception('Not Found', 'E_NOT_FOUND', 404, data);

            expect(e.toJSON()).toEqual({
                name: 'Exception',
                message: 'Not Found',
                code: 'E_NOT_FOUND',
                status: 404,
                data
            });
        });
    });

    describe('Error class does not have `captureStackTrace` method', () => {
        let captureStackTrace;

        beforeAll(() => {
            captureStackTrace = Error.captureStackTrace;
            delete Error.captureStackTrace;
        });

        afterAll(() => {
            Error.captureStackTrace = captureStackTrace;
        });

        test('should capture stack trace', () => {
            const e = new Exception();

            expect(typeof e.stack).toBe('string');
        });
    });
});

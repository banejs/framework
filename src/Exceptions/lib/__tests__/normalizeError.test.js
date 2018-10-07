import normalizeError from '../normalizeError';
import Exception from '../../Exception';

describe('normalizeError', () => {
    test('normalized error is instance of Exception', () => {
        const error1 = new Error();
        const error2 = new Exception();
        const error3 = {};

        expect(normalizeError(error1)).toBeInstanceOf(Exception);
        expect(normalizeError(error2)).toBeInstanceOf(Exception);
        expect(normalizeError(error3)).toBeInstanceOf(Exception);
    });

    test('normalized error has correct value', () => {
        const error1 = new Error();
        const error2 = new Error('Some message');

        expect(normalizeError(error1).message).toBe('Internal error');
        expect(normalizeError(error1).status).toBe(500);
        expect(normalizeError(error1).code).toBe('E_INTERNAL_ERROR');
        expect(normalizeError(error1).data).toEqual({});

        expect(normalizeError(error2).message).toBe('Some message');
        expect(normalizeError(error2).status).toBe(500);
        expect(normalizeError(error2).code).toBe('E_INTERNAL_ERROR');
        expect(normalizeError(error2).data).toEqual({});
    });
});

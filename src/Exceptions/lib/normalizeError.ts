import Exception from '../Exception';
import ExceptionInterface from '../ExceptionInterface';

/**
 * Normalize error object by setting required parameters if they does not exists.
 *
 * @param {Error|ExceptionInterface|*} error
 *
 * @return {ExceptionInterface}
 */
export default function normalizeError(error: Error | ExceptionInterface | any): ExceptionInterface {
    if (!(error instanceof Exception)) {
        return new Exception(error.message);
    }

    return error;
}

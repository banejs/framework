import ExceptionInterface from './ExceptionInterface';
/**
 * Exception is a neutral class extend the Error object.
 *
 * @author Anton Drobot
 */
export default class Exception extends Error implements ExceptionInterface {
    /**
     * Error name.
     *
     * @type {string}
     */
    name: string;
    /**
     * A human-readable description of the error.
     *
     * @type {string}
     */
    message: string;
    /**
     * Error unique code.
     *
     * @type {string}
     */
    code: string;
    /**
     * Error status.
     *
     * @type {number}
     */
    status: number;
    /**
     * Custom fields of error.
     *
     * @type {Object}
     */
    data: object;
    /**
     * Stack trace.
     *
     * @type {string}
     */
    stack?: string;
    constructor(message?: string, code?: string, status?: number, data?: object);
    toJSON(): Object;
}

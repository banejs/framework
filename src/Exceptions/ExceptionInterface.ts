interface ExceptionInterface extends Error {
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

    /**
     * Returns a JSON representing the specified error.
     *
     * @type {Object}
     */
    toJSON(): object;
}

interface ExceptionInterfaceConstructor {
    new(message?: string, code?: string, status?: number, data?: object): ExceptionInterface;
}

declare var ExceptionInterface: ExceptionInterfaceConstructor;

export default ExceptionInterface;

import { ContextType } from './Types/ContextType';

/**
 * Describes a logger instance.
 *
 * The message MUST be a string or object implementing toString().
 *
 * The message MAY contain placeholders in the form: {foo} where foo
 * will be replaced by the context data in key "foo".
 *
 * The context array can contain arbitrary data. The only assumption that
 * can be made by implementors is that if an Exception instance is given
 * to produce a stack trace, it MUST be in a key named "exception".
 */
export default interface LoggerInterface {
    /**
     * System is unusable.
     *
     * @param {string|Error} message
     * @param {Object} [context]
     *
     * @return {void}
     */
    emergency(message: string | Error, context?: ContextType): void;

    /**
     * Action must be taken immediately.
     *
     * Example: Entire website down, database unavailable, etc. This should
     * trigger the SMS alerts and wake you up.
     *
     * @param {string|Error} message
     * @param {Object} [context]
     *
     * @return {void}
     */
    alert(message: string | Error, context?: ContextType): void;

    /**
     * Critical conditions.
     *
     * Example: Application component unavailable, unexpected exception.
     *
     * @param {string|Error} message
     * @param {Object} [context]
     *
     * @return {void}
     */
    critical(message: string | Error, context?: ContextType): void;

    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     *
     * @param {string|Error} message
     * @param {Object} [context]
     *
     * @return {void}
     */
    error(message: string | Error, context?: ContextType): void;

    /**
     * Exceptional occurrences that are not errors.
     *
     * Example: Use of deprecated APIs, poor use of an API, undesirable things
     * that are not necessarily wrong.
     *
     * @param {string} message
     * @param {Object} [context]
     *
     * @return {void}
     */
    warning(message: string, context?: ContextType): void;

    /**
     * Normal but significant events.
     *
     * @param {string} message
     * @param {Object} [context]
     *
     * @return {void}
     */
    notice(message: string, context?: ContextType): void;

    /**
     * Interesting events.
     *
     * Example: User logs in, SQL logs.
     *
     * @param {string} message
     * @param {Object} [context]
     *
     * @return {void}
     */
    info(message: string, context?: ContextType): void;

    /**
     * Detailed debug information.
     *
     * @param {string} message
     * @param {Object} [context]
     *
     * @return {void}
     */
    debug(message: string, context?: ContextType): void;

    /**
     * Logs with an arbitrary level.
     *
     * @param {string} level
     * @param {string} message
     * @param {Object} [context]
     *
     * @return {void}
     */
    log(level: string, message: string, context?: ContextType): void;
}

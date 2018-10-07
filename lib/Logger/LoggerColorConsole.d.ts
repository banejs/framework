import LoggerInterface from './LoggerInterface';
import { ContextType } from './Types/ContextType';
export default class LoggerColorConsole implements LoggerInterface {
    private color;
    private getTime;
    /**
     * System is unusable.
     *
     * @param {string|Error} message
     * @param {Object} [context={}]
     */
    emergency(message: string | Error, context?: ContextType): void;
    /**
     * Action must be taken immediately.
     *
     * Example: Entire website down, database unavailable, etc. This should
     * trigger the SMS alerts and wake you up.
     *
     * @param {string|Error} message
     * @param {Object} [context={}]
     */
    alert(message: string | Error, context?: ContextType): void;
    /**
     * Critical conditions.
     *
     * Example: Application component unavailable, unexpected exception.
     *
     * @param {string|Error} message
     * @param {Object} [context={}]
     */
    critical(message: string | Error, context?: ContextType): void;
    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     *
     * @param {string|Error} message
     * @param {Object} [context={}]
     */
    error(message: string | Error, context?: ContextType): void;
    /**
     * Exceptional occurrences that are not errors.
     *
     * Example: Use of deprecated APIs, poor use of an API, undesirable things
     * that are not necessarily wrong.
     *
     * @param {string} message
     * @param {Object} [context={}]
     */
    warning(message: string, context?: ContextType): void;
    /**
     * Normal but significant events.
     *
     * @param {string} message
     * @param {Object} [context={}]
     */
    notice(message: string, context?: ContextType): void;
    /**
     * Interesting events.
     *
     * Example: User logs in, SQL logs.
     *
     * @param {string} message
     * @param {Object} [context={}]
     */
    info(message: string, context?: ContextType): void;
    /**
     * Detailed debug information.
     *
     * @param {string} message
     * @param {Object} [context={}]
     */
    debug(message: string, context?: ContextType): void;
    /**
     * Logs with an arbitrary level.
     *
     * @param {string} level
     * @param {string} message
     * @param {Object} [context={}]
     */
    log(level: string, message: string, context?: ContextType): void;
}

import chalk from 'chalk';

import LoggerInterface from './LoggerInterface';
import { ContextType } from './Types/ContextType';
import { ChalkColorType } from './Types/ChalkColorType';
import { LogLevelSettingsType } from './Types/LogLevelSettingsType';

import LogLevel from './LogLevel';
import LogLevelSettings from './LogLevelSettings';

export default class LoggerColorConsole implements LoggerInterface {
    private color(str: string, color: ChalkColorType | undefined): string {
        if (color && typeof chalk[color] !== 'undefined') {
            return chalk[color](str);
        }

        return str;
    }

    private getTime(): string {
        const date: Date = new Date();
        const hours: string = String(date.getHours()).padStart(2, '0');
        const minutes: string = String(date.getMinutes()).padStart(2, '0');
        const seconds: string = String(date.getSeconds()).padStart(2, '0');
        const milliseconds: string = String(date.getMilliseconds()).padStart(3, '0');

        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    /**
     * System is unusable.
     *
     * @param {string|Error} message
     * @param {Object} [context={}]
     */
    public emergency(message: string | Error, context: ContextType = {}): void {
        if ((message instanceof Error) && message.stack) {
            this.log(LogLevel.EMERGENCY, message.stack, context);
        } else if (message instanceof Error) {
            this.log(LogLevel.EMERGENCY, message.message, context);
        } else {
            this.log(LogLevel.EMERGENCY, message, context);
        }
    }

    /**
     * Action must be taken immediately.
     *
     * Example: Entire website down, database unavailable, etc. This should
     * trigger the SMS alerts and wake you up.
     *
     * @param {string|Error} message
     * @param {Object} [context={}]
     */
    public alert(message: string | Error, context: ContextType = {}): void {
        if ((message instanceof Error) && message.stack) {
            this.log(LogLevel.ALERT, message.stack, context);
        } else if (message instanceof Error) {
            this.log(LogLevel.ALERT, message.message, context);
        } else {
            this.log(LogLevel.ALERT, message, context);
        }
    }

    /**
     * Critical conditions.
     *
     * Example: Application component unavailable, unexpected exception.
     *
     * @param {string|Error} message
     * @param {Object} [context={}]
     */
    public critical(message: string | Error, context: ContextType = {}): void {
        if ((message instanceof Error) && message.stack) {
            this.log(LogLevel.CRITICAL, message.stack, context);
        } else if (message instanceof Error) {
            this.log(LogLevel.CRITICAL, message.message, context);
        } else {
            this.log(LogLevel.CRITICAL, message, context);
        }
    }

    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     *
     * @param {string|Error} message
     * @param {Object} [context={}]
     */
    public error(message: string | Error, context: ContextType = {}): void {
        if ((message instanceof Error) && message.stack) {
            this.log(LogLevel.ERROR, message.stack, context);
        } else if (message instanceof Error) {
            this.log(LogLevel.ERROR, message.message, context);
        } else {
            this.log(LogLevel.ERROR, message, context);
        }
    }

    /**
     * Exceptional occurrences that are not errors.
     *
     * Example: Use of deprecated APIs, poor use of an API, undesirable things
     * that are not necessarily wrong.
     *
     * @param {string} message
     * @param {Object} [context={}]
     */
    public warning(message: string, context: ContextType = {}): void {
        this.log(LogLevel.WARNING, message, context);
    }

    /**
     * Normal but significant events.
     *
     * @param {string} message
     * @param {Object} [context={}]
     */
    public notice(message: string, context: ContextType = {}): void {
        this.log(LogLevel.NOTICE, message, context);
    }

    /**
     * Interesting events.
     *
     * Example: User logs in, SQL logs.
     *
     * @param {string} message
     * @param {Object} [context={}]
     */
    public info(message: string, context: ContextType = {}): void {
        this.log(LogLevel.INFO, message, context);
    }

    /**
     * Detailed debug information.
     *
     * @param {string} message
     * @param {Object} [context={}]
     */
    public debug(message: string, context: ContextType = {}): void {
        this.log(LogLevel.DEBUG, message, context);
    }

    /**
     * Logs with an arbitrary level.
     *
     * @param {string} level
     * @param {string} message
     * @param {Object} [context={}]
     */
    public log(level: string, message: string, context: ContextType = {}): void {
        const levelSettings: LogLevelSettingsType[keyof LogLevelSettingsType] | undefined = LogLevelSettings[level];
        const levelColor: ChalkColorType | undefined = levelSettings && levelSettings.color;
        const isError: boolean = levelSettings && levelSettings.isError || false;
        const coloredLevelString: string = this.color(`[${level}]`, levelColor);
        const coloredTime: string = this.color(this.getTime(), 'yellow');
        const generatedMessage: string = message.replace(
            /{{([a-z][a-z0-9]*)}}/gi,
            (match: string, variable: string): string => (
                String(context[variable] || match)
            )
        );
        const logMessage: string = `${coloredTime} ${coloredLevelString} ${generatedMessage}\n\n`;

        if (isError) {
            process.stderr.write(logMessage);
        } else {
            process.stdout.write(logMessage);
        }
    }
}

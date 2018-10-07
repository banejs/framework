/* eslint no-extend-native: "off" */

import LoggerColorConsole from '../LoggerColorConsole';

const colors = {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39]
};

function open(color) {
    return `\u001B[${color[0]}m`;
}

function close(color) {
    return `\u001B[${color[1]}m`;
}

const time = `${open(colors.yellow)}14:07:43.041${close(colors.yellow)}`;

describe('LoggerColorConsole', () => {
    const originalProcessStdoutWrite = process.stdout.write;
    const originalProcessStderrWrite = process.stderr.write;
    const originalDateGetHours = Date.prototype.getHours;
    const originalDateGetMinutes = Date.prototype.getMinutes;
    const originalDateGetSeconds = Date.prototype.getSeconds;
    const originalDateGetMilliseconds = Date.prototype.getMilliseconds;

    beforeEach(() => {
        process.stdout.write = jest.fn((str) => str);
        process.stderr.write = jest.fn((str) => str);
        Date.prototype.getHours = jest.fn(() => 14);
        Date.prototype.getMinutes = jest.fn(() => 7);
        Date.prototype.getSeconds = jest.fn(() => 43);
        Date.prototype.getMilliseconds = jest.fn(() => 41);
    });

    afterAll(() => {
        process.stdout.write = originalProcessStdoutWrite;
        process.stderr.write = originalProcessStderrWrite;
        Date.prototype.getHours = originalDateGetHours;
        Date.prototype.getMinutes = originalDateGetMinutes;
        Date.prototype.getSeconds = originalDateGetSeconds;
        Date.prototype.getMilliseconds = originalDateGetMilliseconds;
    });

    describe('#log(level, message, context)', () => {
        test('should display message with an unexpected level', () => {
            const logger = new LoggerColorConsole();

            logger.log('unexpected level', 'some message');
            expect(process.stdout.write.mock.results[0].value).toBe(`${time} [unexpected level] some message\n\n`);
        });

        test('should display message with an unexpected level with replaced variables', () => {
            const logger = new LoggerColorConsole();

            logger.log('unexpected level', 'some {{variable}} in message', { variable: 'food' });
            expect(process.stdout.write.mock.results[0].value).toBe(`${time} [unexpected level] some food in message\n\n`);
        });

        test('should display message with an unexpected level without replaced variables', () => {
            const logger = new LoggerColorConsole();

            logger.log('unexpected level', 'some {{variable}} in message');
            expect(process.stdout.write.mock.results[0].value).toBe(`${time} [unexpected level] some {{variable}} in message\n\n`);
        });
    });

    describe('#emergency(message, context)', () => {
        const level = `${open(colors.red)}[emergency]${close(colors.red)}`;

        test('should display message with an emergency level', () => {
            const logger = new LoggerColorConsole();

            logger.emergency('some message');
            expect(process.stderr.write.mock.results[0].value).toBe(`${time} ${level} some message\n\n`);
        });

        test('should display message with an emergency level with replaced variables', () => {
            const logger = new LoggerColorConsole();

            logger.emergency('some {{variable}} in message', { variable: 'food' });
            expect(process.stderr.write.mock.results[0].value).toBe(`${time} ${level} some food in message\n\n`);
        });

        test('should display message with an emergency level without replaced variables', () => {
            const logger = new LoggerColorConsole();

            logger.emergency('some {{variable}} in message');
            expect(process.stderr.write.mock.results[0].value).toBe(`${time} ${level} some {{variable}} in message\n\n`);
        });

        test('should display error stack with an emergency level', () => {
            const logger = new LoggerColorConsole();
            const errorInstance = new Error('some message');

            logger.emergency(errorInstance);
            expect(process.stderr.write.mock.results[0].value).toBe(`${time} ${level} ${errorInstance.stack}\n\n`);
        });

        test('should display error message without stack with an emergency level', () => {
            const logger = new LoggerColorConsole();
            const errorInstance = new Error('some message');

            delete errorInstance.stack;

            logger.emergency(errorInstance);
            expect(process.stderr.write.mock.results[0].value).toBe(`${time} ${level} ${errorInstance.message}\n\n`);
        });
    });

    describe('#alert(message, context)', () => {
        const level = `${open(colors.red)}[alert]${close(colors.red)}`;

        test('should display message with an alert level', () => {
            const logger = new LoggerColorConsole();

            logger.alert('some message');
            expect(process.stderr.write.mock.results[0].value).toBe(`${time} ${level} some message\n\n`);
        });

        test('should display message with an alert level with replaced variables', () => {
            const logger = new LoggerColorConsole();

            logger.alert('some {{variable}} in message', { variable: 'food' });
            expect(process.stderr.write.mock.results[0].value).toBe(`${time} ${level} some food in message\n\n`);
        });

        test('should display message with an alert level without replaced variables', () => {
            const logger = new LoggerColorConsole();

            logger.alert('some {{variable}} in message');
            expect(process.stderr.write.mock.results[0].value).toBe(`${time} ${level} some {{variable}} in message\n\n`);
        });

        test('should display error stack with an alert level', () => {
            const logger = new LoggerColorConsole();
            const errorInstance = new Error('some message');

            logger.alert(errorInstance);
            expect(process.stderr.write.mock.results[0].value).toBe(`${time} ${level} ${errorInstance.stack}\n\n`);
        });

        test('should display error message without stack with an alert level', () => {
            const logger = new LoggerColorConsole();
            const errorInstance = new Error('some message');

            delete errorInstance.stack;

            logger.alert(errorInstance);
            expect(process.stderr.write.mock.results[0].value).toBe(`${time} ${level} ${errorInstance.message}\n\n`);
        });
    });

    describe('#critical(message, context)', () => {
        const level = `${open(colors.red)}[critical]${close(colors.red)}`;

        test('should display message with an critical level', () => {
            const logger = new LoggerColorConsole();

            logger.critical('some message');
            expect(process.stderr.write.mock.results[0].value).toBe(`${time} ${level} some message\n\n`);
        });

        test('should display message with an critical level with replaced variables', () => {
            const logger = new LoggerColorConsole();

            logger.critical('some {{variable}} in message', { variable: 'food' });
            expect(process.stderr.write.mock.results[0].value).toBe(`${time} ${level} some food in message\n\n`);
        });

        test('should display message with an critical level without replaced variables', () => {
            const logger = new LoggerColorConsole();

            logger.critical('some {{variable}} in message');
            expect(process.stderr.write.mock.results[0].value).toBe(`${time} ${level} some {{variable}} in message\n\n`);
        });

        test('should display error stack with an critical level', () => {
            const logger = new LoggerColorConsole();
            const errorInstance = new Error('some message');

            logger.critical(errorInstance);
            expect(process.stderr.write.mock.results[0].value).toBe(`${time} ${level} ${errorInstance.stack}\n\n`);
        });

        test('should display error message without stack with an critical level', () => {
            const logger = new LoggerColorConsole();
            const errorInstance = new Error('some message');

            delete errorInstance.stack;

            logger.critical(errorInstance);
            expect(process.stderr.write.mock.results[0].value).toBe(`${time} ${level} ${errorInstance.message}\n\n`);
        });
    });

    describe('#error(message, context)', () => {
        const level = `${open(colors.red)}[error]${close(colors.red)}`;

        test('should display message with an error level', () => {
            const logger = new LoggerColorConsole();

            logger.error('some message');
            expect(process.stderr.write.mock.results[0].value).toBe(`${time} ${level} some message\n\n`);
        });

        test('should display message with an error level with replaced variables', () => {
            const logger = new LoggerColorConsole();

            logger.error('some {{variable}} in message', { variable: 'food' });
            expect(process.stderr.write.mock.results[0].value).toBe(`${time} ${level} some food in message\n\n`);
        });

        test('should display message with an error level without replaced variables', () => {
            const logger = new LoggerColorConsole();

            logger.error('some {{variable}} in message');
            expect(process.stderr.write.mock.results[0].value).toBe(`${time} ${level} some {{variable}} in message\n\n`);
        });

        test('should display error stack with an error level', () => {
            const logger = new LoggerColorConsole();
            const errorInstance = new Error('some message');

            logger.error(errorInstance);
            expect(process.stderr.write.mock.results[0].value).toBe(`${time} ${level} ${errorInstance.stack}\n\n`);
        });

        test('should display error message without stack with an error level', () => {
            const logger = new LoggerColorConsole();
            const errorInstance = new Error('some message');

            delete errorInstance.stack;

            logger.error(errorInstance);
            expect(process.stderr.write.mock.results[0].value).toBe(`${time} ${level} ${errorInstance.message}\n\n`);
        });
    });

    describe('#warning(message, context)', () => {
        const level = `${open(colors.yellow)}[warning]${close(colors.yellow)}`;

        test('should display message with an warning level', () => {
            const logger = new LoggerColorConsole();

            logger.warning('some message');
            expect(process.stdout.write.mock.results[0].value).toBe(`${time} ${level} some message\n\n`);
        });

        test('should display message with an warning level with replaced variables', () => {
            const logger = new LoggerColorConsole();

            logger.warning('some {{variable}} in message', { variable: 'food' });
            expect(process.stdout.write.mock.results[0].value).toBe(`${time} ${level} some food in message\n\n`);
        });

        test('should display message with an warning level without replaced variables', () => {
            const logger = new LoggerColorConsole();

            logger.warning('some {{variable}} in message');
            expect(process.stdout.write.mock.results[0].value).toBe(`${time} ${level} some {{variable}} in message\n\n`);
        });
    });

    describe('#notice(message, context)', () => {
        const level = `${open(colors.yellow)}[notice]${close(colors.yellow)}`;

        test('should display message with an notice level', () => {
            const logger = new LoggerColorConsole();

            logger.notice('some message');
            expect(process.stdout.write.mock.results[0].value).toBe(`${time} ${level} some message\n\n`);
        });

        test('should display message with an notice level with replaced variables', () => {
            const logger = new LoggerColorConsole();

            logger.notice('some {{variable}} in message', { variable: 'food' });
            expect(process.stdout.write.mock.results[0].value).toBe(`${time} ${level} some food in message\n\n`);
        });

        test('should display message with an notice level without replaced variables', () => {
            const logger = new LoggerColorConsole();

            logger.notice('some {{variable}} in message');
            expect(process.stdout.write.mock.results[0].value).toBe(`${time} ${level} some {{variable}} in message\n\n`);
        });
    });

    describe('#info(message, context)', () => {
        const level = `${open(colors.blue)}[info]${close(colors.blue)}`;

        test('should display message with an info level', () => {
            const logger = new LoggerColorConsole();

            logger.info('some message');
            expect(process.stdout.write.mock.results[0].value).toBe(`${time} ${level} some message\n\n`);
        });

        test('should display message with an info level with replaced variables', () => {
            const logger = new LoggerColorConsole();

            logger.info('some {{variable}} in message', { variable: 'food' });
            expect(process.stdout.write.mock.results[0].value).toBe(`${time} ${level} some food in message\n\n`);
        });

        test('should display message with an info level without replaced variables', () => {
            const logger = new LoggerColorConsole();

            logger.info('some {{variable}} in message');
            expect(process.stdout.write.mock.results[0].value).toBe(`${time} ${level} some {{variable}} in message\n\n`);
        });
    });

    describe('#debug(message, context)', () => {
        const level = `${open(colors.cyan)}[debug]${close(colors.cyan)}`;

        test('should display message with an debug level', () => {
            const logger = new LoggerColorConsole();

            logger.debug('some message');
            expect(process.stdout.write.mock.results[0].value).toBe(`${time} ${level} some message\n\n`);
        });

        test('should display message with an debug level with replaced variables', () => {
            const logger = new LoggerColorConsole();

            logger.debug('some {{variable}} in message', { variable: 'food' });
            expect(process.stdout.write.mock.results[0].value).toBe(`${time} ${level} some food in message\n\n`);
        });

        test('should display message with an debug level without replaced variables', () => {
            const logger = new LoggerColorConsole();

            logger.debug('some {{variable}} in message');
            expect(process.stdout.write.mock.results[0].value).toBe(`${time} ${level} some {{variable}} in message\n\n`);
        });
    });
});

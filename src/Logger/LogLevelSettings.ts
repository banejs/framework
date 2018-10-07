import { LogLevelSettingsType } from './Types/LogLevelSettingsType';

import LogLevel from './LogLevel';

const LogLevelSettings: LogLevelSettingsType = {
    [LogLevel.EMERGENCY]: {
        color: 'red',
        isError: true
    },
    [LogLevel.ALERT]: {
        color: 'red',
        isError: true
    },
    [LogLevel.CRITICAL]: {
        color: 'red',
        isError: true
    },
    [LogLevel.ERROR]: {
        color: 'red',
        isError: true
    },
    [LogLevel.WARNING]: {
        color: 'yellow',
        isError: false
    },
    [LogLevel.NOTICE]: {
        color: 'yellow',
        isError: false
    },
    [LogLevel.INFO]: {
        color: 'blue',
        isError: false
    },
    [LogLevel.DEBUG]: {
        color: 'cyan',
        isError: false
    }
};

export default LogLevelSettings;

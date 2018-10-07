import { ChalkColorType } from './ChalkColorType';

export type LogLevelSettingsType = {
    [level: string]: {
        color?: ChalkColorType;
        isError?: boolean;
    };
};

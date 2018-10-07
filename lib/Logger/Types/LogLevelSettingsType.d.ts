import { ChalkColorType } from './ChalkColorType';
export declare type LogLevelSettingsType = {
    [level: string]: {
        color?: ChalkColorType;
        isError?: boolean;
    };
};

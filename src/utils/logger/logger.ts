import { LogLevel } from './logger.type';

const formatMessage = (level: LogLevel, message: string) => {
    const prefix = `[${level.toUpperCase()}]`;
    return `${prefix} ${message}`;
};

const log = (level: LogLevel, message: string) => {
    const formatted = formatMessage(level, message);

    switch (level) {
        case 'info':
            console.info(formatted);
            break;
        case 'warn':
            console.warn(formatted);
            break;
        case 'error':
            console.error(formatted);
            break;
    }
};

export const logger = {
    info: (msg: string) => log('info', msg),
    warn: (msg: string) => log('warn', msg),
    error: (msg: string) => log('error', msg),
};

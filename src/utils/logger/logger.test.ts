import { logger } from './logger';

jest.spyOn(console, 'info').mockImplementation(() => {});
jest.spyOn(console, 'warn').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});

describe('Logger', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should log a info message', () => {
        logger.info('test');

        expect(console.info).toHaveBeenCalledWith('[INFO] test');
    });

    it('should log a warn message', () => {
        logger.warn('test');

        expect(console.warn).toHaveBeenCalledWith('[WARN] test');
    });

    it('should log a error message', () => {
        logger.error('test');

        expect(console.error).toHaveBeenCalledWith('[ERROR] test');
    });
});

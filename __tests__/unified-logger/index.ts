import { UnifiedLogger } from  '../../lib/unified-logger';

console.log = jest.fn();
console.warn = jest.fn();
console.error = jest.fn();

describe('Unified Logger', () => {
    describe('If no third-party SDK is supplied', () => {
        const logger = new UnifiedLogger();

        test('the built-in console logger becomes the fallback', () => {
            logger.log('hello log');
            logger.warn('hello warn');
            logger.error('hello error');

            expect(console.log).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.error).toHaveBeenCalledTimes(1);
        });
    });

    describe('If an SDK is supplied and supported', () => {
        test('it sends a log to the SDK with the payload and the timestamp', () => {
            const sdk = {
                log: jest.fn(),
                warn: jest.fn(),
                error: jest.fn(),
                constructor: {
                    name: 'FsLogWriter'
                }
            };

            const logger = new UnifiedLogger(sdk);

            logger.log('hello');

            expect(sdk.log).toHaveBeenCalledTimes(1);
        });

        describe('If the SDK is supplied but not supported', () => {
            const unsupportedSdk = {
                log: jest.fn(),
                warn: jest.fn(),
                error: jest.fn(),
                constructor: {
                    name: 'foobar'
                }
            };

            test('the built-in console logger becomes the fallback', () => {
                const logger = new UnifiedLogger(unsupportedSdk);

                logger.log('hello');

                expect(unsupportedSdk.log).toHaveBeenCalledTimes(0);
                expect(console.log).toHaveBeenCalledTimes(2);
            });
        });
    });
});
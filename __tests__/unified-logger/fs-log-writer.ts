/* tslint:disable */

jest.mock('fs', () => ({
    writeFile: jest.fn()
}));

import fs from 'fs';

import { FsLogWriter } from '../../lib/unified-logger/log-writers/fs-log-writer';

describe('FS Log Writer', () => {
    const fsWriterClient = new FsLogWriter(fs);

    describe('with invalid params', () => {
        test('it throws an error', () => {
            expect(() => {
                // @ts-expect-error
                fsWriterClient.log()
            }).toThrowError();
        });
    });

    describe('with valid params', () => {
        test('it calls its sdk to write to a destination', () => {
            const timestamp = Date.now();
            const payload = 'hello';

            fsWriterClient.log(timestamp, payload);

            expect(fs.writeFile).toHaveBeenCalledWith(
                `./lib/unified-logger/logs/${timestamp}.txt`,
                payload
            );
        });
    });
});
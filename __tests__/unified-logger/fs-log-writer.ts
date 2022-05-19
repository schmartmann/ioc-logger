jest.mock('fs', () => ({
    writeFile: jest.fn()
}));

import fs from 'fs';

import { FsHandler } from '../../lib/unified-logger/handlers/fs-handler';

describe('FS Log Writer', () => {
    const fsWriterClient = new FsHandler(fs);

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

            expect(fs.writeFile).toHaveBeenCalledTimes(1)
        });
    });
});
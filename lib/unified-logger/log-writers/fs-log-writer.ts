import { FsType } from '../types/fs-type';

export class FsLogWriter {
    sdk: FsType;

    constructor(sdk: FsType) {
        this.sdk = sdk;
    }

    log(timestamp: number, payload: string) {
        if (timestamp && payload) {
            this.sdk.writeFile(`./lib/unified-logger/logs/${timestamp}.txt`, payload, (error: Error) => {
                if (error) {
                    console.error(error);
                }
            });
        } else {
            throw new Error('missing one or more required fields: "timestamp", "payload"');
        }
    }

    warn(timestamp: number, payload: string) {
        if (timestamp && payload) {
            this.sdk.writeFile(`./lib/unified-logger/warnings/${timestamp}.txt`, payload, (error: Error) => {
                if (error) {
                    console.error(error);
                }
            });
        } else {
            throw new Error('missing one or more required fields: "timestamp", "payload"');
        }
    }

    error(timestamp: number, payload: string) {
        if (timestamp && payload) {
            this.sdk.writeFile(`./lib/unified-logger/errors/${timestamp}.txt`, payload, (error: Error) => {
                if (error) {
                    console.error(error);
                }
            });
        } else {
            throw new Error('missing one or more required fields: "timestamp", "payload"');
        }
    }
};
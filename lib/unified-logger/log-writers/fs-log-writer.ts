export class FsLogWriter {
    sdk: any;

    constructor(sdk: object) {
        this.sdk = sdk;
    }

    log(timestamp: number, payload: string) {
        this.sdk.writeFile(`./lib/unified-logger/logs/${timestamp}.txt`, payload, (error: Error) => {
            if (error) {
                // tslint:disable-next-line:no-console
                console.error(error);
            }
        });
    }

    warn(timestamp: number, payload: string) {
        this.sdk.writeFile(`./lib/unified-logger/warnings/${timestamp}.txt`, payload, (error: Error) => {
            if (error) {
                // tslint:disable-next-line:no-console
                console.error(error);
            }
        });
    }

    error(timestamp: number, payload: string) {
        this.sdk.writeFile(`./lib/unified-logger/errors/${timestamp}.txt`, payload, (error: Error) => {
            if (error) {
                // tslint:disable-next-line:no-console
                console.error(error);
            }
        });
    }
};
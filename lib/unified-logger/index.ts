export interface LogWriter {
    // any service that has a method that saves loggable data
    // to a location

    log(timestamp: number, payload: string): void
    warn(timestamp: number, payload: string): void
    error(timestamp: number, payload: string): void
};

export class UnifiedLogger {
    writer: LogWriter | Console;

    constructor(logWriter: LogWriter | void) {
        this.writer = this.validateLogWriter(logWriter);
    }

    log(payload: string): void {
        this.writer.log(Date.now(), payload);
    };

    warn(payload: string): void {
        this.writer.warn(Date.now(), payload);
    };

    error(payload: string): void {
        this.writer.error(Date.now(), payload);
    };

    validateLogWriter(logWriter: LogWriter | void) {
        if (logWriter) {
            const name = logWriter.constructor.name;

            if (this.supportedLoggers().includes(name)) {
                return logWriter;
            } else {
                return console;
            }
        } else {
            return console;
        }
    };

    supportedLoggers() {
        return [
            'FsLogWriter'
        ];
    }
};

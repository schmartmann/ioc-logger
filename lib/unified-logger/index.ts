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

// logging service should take in a log writer
// that handles the actual,final writing of the logger
// and we can expect it to be one of a few types
// and if the type is not supplied, then perhaps it defaults to console.log
// and the logging service requires certain parameters in order to log a message
// this can be enforced in typescript
// that way, we can have uniform presentation of logs
// maybe it's like -- caller function name, uuid, and data?

// tests
// enforces params
// if a third-party logger IS supplied, we ensure it is one of the valid types
// if a third-party logger is not supplied, it's going to call console.log
//
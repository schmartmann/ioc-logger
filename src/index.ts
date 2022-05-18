import express from 'express';
import { UnifiedLogger } from '../lib/unified-logger';
import { FsLogWriter } from '../lib/unified-logger/log-writers/fs-log-writer';
import fs from 'fs';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/fs', (req, res) => {
    try {
        throw new Error('will always error to demonstrate error logger');
    } catch (error) {
        const loggerSdk = new FsLogWriter(fs);
        const logger = new UnifiedLogger(loggerSdk);
        logger.error('Just produced an error');
        res.send('Finished')
    }
});

app.post('/console', (req, res) => {
    try {
        throw new Error('will always error to demonstrate error logger');
    } catch(error) {
        const logger = new UnifiedLogger();
        logger.error('Just produced an error');
        res.send('Finished');
    }
});

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`IOC Logging app listening on port ${port}`)
});
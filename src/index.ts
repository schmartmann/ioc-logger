import express from 'express';
import { UnifiedLogger } from '../lib/unified-logger';
import { FsHandler } from '../lib/unified-logger/handlers/fs-handler';
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
        const loggerHandler = new FsHandler(fs);
        const logger = new UnifiedLogger(loggerHandler);
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
    console.log(`IOC Logging app listening on port ${port}`)
});
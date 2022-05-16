import express, { Application, Request, Response } from 'express';
const app: Application = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`IOC Logging app listening on port ${port}`)
});
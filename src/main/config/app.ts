import express, { Request, Response } from 'express';
import httpStatuscode from 'http-status-codes';

export const setupApp = (): express.Express => {
    const app = express();
    app.use(express.json());
    app.get('/ping', (req: Request, res: Response) => {
        res.status(httpStatuscode.OK).json({ message: 'pong'});
    });
    return app;
};

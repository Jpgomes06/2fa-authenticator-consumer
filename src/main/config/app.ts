import express, { Request, Response } from 'express';

export const setupApp = (): express.Express => {
    const app = express();
    app.use(express.json());
    app.get('/ping', (req: Request, res: Response) => {
        res.status(200).json({ message: 'pong'});
    });
    return app;
};

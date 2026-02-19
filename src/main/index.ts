import env from './config/env';
import 'dotenv/config';
import mongoose from 'mongoose';
import pino from 'pino';
const logger = pino();

import { setupApp } from './config/app';
import {totpAccountConsumer} from './container/totp-account.container'

const start = async (): Promise<void> => {
    try {
        await mongoose.connect(env.mongoUrl);
        logger.info('[MongoDB] connected');
        const app = setupApp();
        const consumer = totpAccountConsumer();
        await consumer.start();
        app.listen(env.port,() => {
            logger.info(
                { url: `http://localhost:${env.port}` },
                'Server running'
            );
        });
    } catch (error) {
        logger.error( { err: error }, 'Error starting server:');
        process.exit(1);
    }
};

start();

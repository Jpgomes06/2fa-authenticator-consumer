import env from './config/env';
import 'dotenv/config';
import mongoose from 'mongoose';
import { setupApp } from './config/app';
import {totpAccountConsumer} from './container/totp-account.container'

const start = async (): Promise<void> => {
    try {
        await mongoose.connect(env.mongoUrl);
        console.log('MongoDB connected');
        const app = setupApp();
        const consumer = totpAccountConsumer();
        await consumer.start();
        const server = app.listen(env.port, () => {
            console.log(`Server running on port ${env.port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

start();

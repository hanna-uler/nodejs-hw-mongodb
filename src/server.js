import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import contactsRouter from './routers/contacts.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(getEnvVar("PORT", 3000));

export default function setupServer() {
    const app = express();

    app.use(express.json());

    app.use(cors());

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.use(contactsRouter);
    app.use(notFoundHandler);
    app.use(errorHandler);

    app.listen(PORT, (error) => {
        if (error) {
            throw error;
        }
        console.log(`Server is running on port ${PORT}`)
    });
};

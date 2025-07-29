import setupServer from './server.js';
import initMongoConnection from './db/initMongoConnection.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR } from './constants/index.js';

async function bootstrap() {
    await initMongoConnection();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    setupServer();
};

bootstrap();


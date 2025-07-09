import mongoose, { get } from "mongoose";
import { getEnvVar } from '../utils/getEnvVar.js';

export default async function initMongoConnection() {
    try {
        const user = getEnvVar("MONGODB_USER");
        const pwd = getEnvVar("MONGODB_PASSWORD");
        const url = getEnvVar("MONGODB_URL");
        const db = getEnvVar("MONGODB_DB");
        const dbUrl = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`

        await mongoose.connect(dbUrl);
        console.log('Mongo connection successfully established!');
    } catch (error) {
        console.log('Error while setting up mongo connection', error);
        throw error;
    }
};

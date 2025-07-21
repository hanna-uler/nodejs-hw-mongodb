import { UsersCollection } from "../db/models/user.js";
import createHttpError from "http-errors";
import bcrypt from 'bcrypt';

export const registerUser = async (payload) => {
    // console.log(`at registerUser => payload: ${payload}`);
    const user = await UsersCollection.findOne({ email: payload.email });
    if (user) throw createHttpError(409, "Email is in use");
    const encryptedPass = await bcrypt.hash(payload.password, 10);
    return await UsersCollection.create({
        ...payload,
        password: encryptedPass,
    });
};

export const loginUser = async (payload) => {
    console.log(`At loginUser => payload: ${payload}`);
    const user = await UsersCollection.findOne({ email: payload.email });
    if (!user) {
        throw createHttpError(401, "User is not found");
    }
    const isEqual = await bcrypt.compare(payload.password);
    if (!isEqual) {
        throw createHttpError(401, "Wrong password.");
    }
};

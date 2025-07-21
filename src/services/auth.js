import { UsersCollection } from "../db/models/user.js";
import { SessionsCollection } from "../db/models/session.js";
import createHttpError from "http-errors";
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from "../constants/index.js";

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
    console.log(`At loginUser => payload.email: ${payload.email}`);
    const user = await UsersCollection.findOne({ email: payload.email });
    if (!user) {
        throw createHttpError(401, "Email or password is incorrect.");
    }
    const isEqual = await bcrypt.compare(payload.password, user.password);
    if (!isEqual) {
        throw createHttpError(401, "Email or password is incorrect.");
    }
    await SessionsCollection.deleteOne({ userId: user._id });

    const accessToken = randomBytes(30).toString("base64");
    const refreshToken = randomBytes(30).toString("base64");

    return await SessionsCollection.create({
        userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
    });
};

export const logoutUser = async (sessionId) => {
    await SessionsCollection.deleteOne({ _id: sessionId });
};

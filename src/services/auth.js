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

const createSession = () => {
    const accessToken = randomBytes(30).toString("base64");
    const refreshToken = randomBytes(30).toString("base64");
    return {
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
    };
};
export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
    console.log(`At refreshUsersSession => sessionId: ${sessionId}, refreshToken: ${refreshToken}`);

    const session = await SessionsCollection.findOne({
        _id: sessionId,
        refreshToken,
    });
    if (!session) {
        throw createHttpError(401, "Session is not found. Please, log in.");
    }
    const isSessionTokenExpired = new Date() > new Date(session.refreshTokenValidUntil);
    if (isSessionTokenExpired)
        throw createHttpError(401, "The session is expired. Please, log in again.");
    const newSession = createSession();
    console.log(`At refreshUsersSession => newSession: ${newSession}`);
    await SessionsCollection.deleteOne({ _id: sessionId });
    return await SessionsCollection.create({
        userId: session.userId,
        ...newSession
    });
};

export const logoutUser = async (sessionId) => {
    await SessionsCollection.deleteOne({ _id: sessionId });
};

export const sendPassResetEmail = async (email) => {
    const user = await UsersCollection.findOne({ email });
    if (!user) {
        throw createHttpError(404, "User is not found.");
    }
};

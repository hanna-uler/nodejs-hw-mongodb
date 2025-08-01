import createHttpError from "http-errors";
import { SessionsCollection } from "../db/models/session.js";
import { UsersCollection } from "../db/models/user.js";

export const authenticate = async (req, res, next) => {
    const authHeader = req.get("Authorization");

    if (!authHeader) {
        next(createHttpError(401, "Please provide Authorization header"));
        return;
    }
    const bearer = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];

    if (bearer !== "Bearer" || !token) {
        next(createHttpError(401, "Authorization header should be of Bearer type."));
        return;
    }
    const session = await SessionsCollection.findOne({ accessToken: token });
    if (!session) {
        next(createHttpError(401, "Session is not found"));
        return;
    }

    const isAccessTokenExpired = new Date() > new Date(session.accessTokenValidUntil);
    if (isAccessTokenExpired) {
        next(createHttpError(401, "The access token is expired"));
        return;
    }

    const user = await UsersCollection.findOne(session.userId);
    if (!user) {
        next(createHttpError(401, "Unauthorized"));
        return;
    }
    req.user = user;
    next();
};

import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";

export const isValidId = (req, res, next) => {
    const { contactId } = req.params;
    const userId = req.user._id;
    if (!isValidObjectId(contactId) || !isValidObjectId(userId)) {
        throw createHttpError(400, "Bad Request");
    }
    next();
};

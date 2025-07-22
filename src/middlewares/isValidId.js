import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";

export const isValidId = (req, res, next) => {
    const { contactId } = req.params;
    const userId = req.user._id;
    console.log("isValidId => contactId: ", contactId, "userId: ", userId);
    if (!isValidObjectId(contactId) || !isValidObjectId(userId)) {
        throw createHttpError(400, "Bad Request");
    }
    next();
};

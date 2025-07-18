import { UsersCollection } from "../db/models/user.js";

export const registerUser = async (payload) => {
    // console.log(`at registerUser => payload: ${payload}`);
    return await UsersCollection.create(payload);
};

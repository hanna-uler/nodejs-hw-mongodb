import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: {type: String, required: true}
},
    {
        timestamps: true,
        versionKey: false
});

export const UsersCollection = mongoose.model("users", usersSchema);

import mongoose from "mongoose";

const sessionsSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        accessToken: { type: String, required: true },
        refreshToken: { type: String, required: true },
        accessTokenValidUntil: { type: Date, required: true },
        refreshTokenValidUntil: { type: Date, required: true }
},
    {
        timestamps: true,
        versionKey: false
});

export const SessionsCollection = mongoose.model("sessions", sessionsSchema);

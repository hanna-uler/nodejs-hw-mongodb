import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: false,
        },
        isFavourite: {
            type: Boolean,
            default: false,
            required: false,
        },
        contactType: {
            type: String,
            enum: ["work", "home", "personal"],
            required: true,
            default: "personal",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        photo: {
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const ContactsCollection = mongoose.model("contacts", contactSchema);

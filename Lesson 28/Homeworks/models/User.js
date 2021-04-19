import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        email: true,
        required: true,
        trim: true,
        lowercase: true,
    },
    mobile: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const userModel = model("users", UserSchema);

export { userModel };
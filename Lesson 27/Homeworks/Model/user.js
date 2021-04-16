import { model, Schema } from "mongoose";

// Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    number: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true });

// model
const UserModel = model("user", UserSchema);

// Eexport
// it's preferred to export model, not schema
export { UserModel };
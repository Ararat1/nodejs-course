import { Schema, model } from "mongoose";

// Schemas
const UserSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        lowercase: true
    }
}, { timestamps: true });

const BlogSchema = new Schema({
    title: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    body: {
        type: String
    }
}, { timestamps: true });

// Models
const UserModel = model("users", UserSchema);
const BlogModel = model("blogs", BlogSchema);

export { UserModel, BlogModel }
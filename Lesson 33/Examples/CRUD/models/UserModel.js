import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    image: String
}, { timestamps: true });

const UserModel = model("users", UserSchema);

export { UserModel };
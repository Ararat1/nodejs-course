import { Schema, model } from "mongoose";

const PersonSchema = new Schema({
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    age: {
        type: Number
    }
}, { timestamps: true });

export const PersonModel = model("person", PersonSchema);
import { Schema, model } from "mongoose";

const PersonSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    tel: {
        type: String
    }
}, { timestamps: true });

const PersonModel = model("person", PersonSchema);

export { PersonModel };
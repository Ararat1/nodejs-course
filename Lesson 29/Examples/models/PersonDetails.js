import { Schema, model } from "mongoose";

const PersonDetailsSchema = new Schema({
    city: {
        type: String,
    },
    weight: {
        type: Number,
    },
    nation: {
        type: String
    }
}, { timestamps: true });

export const PersonDetailsModel = model("personDetails", PersonDetailsSchema);
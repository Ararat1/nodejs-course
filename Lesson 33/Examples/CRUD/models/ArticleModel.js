import { Schema, model } from "mongoose";

const ArticleSchema = new Schema({
    title: String,
    description: String,
    content: String,
    image: String
}, { timestamps: true });

const ArticleModel = model("articles", ArticleSchema);

export { ArticleModel };
import { model, Schema } from "mongoose";

// Schema
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    imageName: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

// Model
const ArticleModel = model("article", ArticleSchema);

// Export
// It's preferred to export model, not schema
export { ArticleModel };
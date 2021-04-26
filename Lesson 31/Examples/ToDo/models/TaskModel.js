import { Schema, model } from "mongoose";

const Taskchema = new Schema({
    title: {
        type: String,
        trim: true
    }
}, { timestamps: true });

const TaskModel = model("tasks", Taskchema);

export { TaskModel };
import { TaskModel } from "../models/TaskModel";

class TasksController {
    static index(req, res) {
        res.render("tasks");
    }

    static async post(req, res) {
        try {
            let savedTask = await TaskModel.create({ title: req.body.task });

            let task = {
                id: savedTask._id,
                title: savedTask.title,
                date: savedTask.createdAt
            };

            res.json({ task });
        } catch (err) {
            res.json({ error: err.message });
        }
    }
}

export { TasksController };
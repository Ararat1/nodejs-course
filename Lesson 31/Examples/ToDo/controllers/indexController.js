import { TaskModel } from "../models/TaskModel";

class IndexController {
    /* GET home page. */
    static async index(req, res) {
        let tasks = await TaskModel.find({}, { title: 1, createdAt: 1 });

        res.render("index", { tasks });
    }

    static async delete(req, res) {
        await TaskModel.deleteOne({_id: req.body._id});

        res.json({ message: "Deleted..!" });
    }
}

export { IndexController };
import { ArticleModel } from "../models/ArticleModel";

class IndexController {
    static async indexView(req, res) {
        let articles = await ArticleModel
            .find()
            .sort({ createdAt: -1 })
            .lean();

        res.render("index", { articles });
    }
};

export default IndexController;
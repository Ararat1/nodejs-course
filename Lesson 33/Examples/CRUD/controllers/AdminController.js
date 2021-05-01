import { ArticleModel } from "../models/ArticleModel";

class AdminController {
    static async adminView(req, res) {
        try {
            let articles = await ArticleModel.find().sort({ createdAt: -1 }).lean();

            res.render("admin", { articles });
        } catch ({ message }) {
            console.log("Admin error: ", message);
            res.redirect("/");
        }
    }

    static newArticleView(req, res) {
        res.render("newArticle");
    }

    static async createArticle({ body: { title, description, content }, file: { filename } }, res) {
        try {
            let image = "";

            if (filename) {
                image = filename
            }


            let newArticle = new ArticleModel({ title, description, content, image });

            await newArticle.save();

            res.redirect("/admin");
        } catch ({ message }) {
            console.log("Create article error: ", message);
            res.redirect("/admin/new-article");
        }
    }

    static async readArticle({ params: { id } }, res) {
        try {
            let article = await ArticleModel.findById(id);

            res.render("readArticle", { article });
        } catch ({ message }) {
            console.log("Read article error: ", message);
            res.redirect("/admin");
        }
    }

    static async updateArticleView({ params: { id } }, res) {
        try {
            let article = await ArticleModel.findById(id);

            res.render("updateArticle", { article });
        } catch ({ message }) {
            console.log("Update article error: ", message);
            res.redirect("/admin");
        }
    }

    static async updateArticle({ params: { id }, body: { title, description, content }, file }, res) {
        try {
            let article = await ArticleModel.findById(id);

            article.title = title;
            article.description = description;
            article.content = content;

            if (file) {
                article.image = file.filename;
            }

            await article.save();

            res.status(302).redirect("/admin");
        } catch ({ message }) {
            console.log("Update article error: ", message);
            res.redirect("/admin");
        }
    };

    static async deleteArticle({ params: { id } }, res) {
        try {
            await ArticleModel.deleteOne({ _id: id });

            res.status(204).send();
        } catch ({ message }) {
            console.log("Delete article error: ", message);
            res.redirect("/admin");
        }
    }
}

export default AdminController;
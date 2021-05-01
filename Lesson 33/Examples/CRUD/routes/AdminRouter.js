import express from "express";

import AdminController from "../controllers/AdminController";
import { checkSign, upload, imageResizer } from "../middlewares";

const router = express.Router();

/* GET admin page. */
router.get("/", checkSign, AdminController.adminView);

/* GET new article page. */
router.get("/new-article", checkSign, AdminController.newArticleView);

/* POST create a new article */
router.post("/new-article", checkSign, upload, AdminController.createArticle);

/* GET read an article */
router.get("/read/:id", checkSign, AdminController.readArticle);

/* GET update an article view*/
router.get("/update/:id", checkSign, AdminController.updateArticleView);

/* POST update an article*/
router.post("/update/:id", upload, AdminController.updateArticle);

/* GET delete an article */
router.get("/delete/:id", checkSign, AdminController.deleteArticle);

export { router };
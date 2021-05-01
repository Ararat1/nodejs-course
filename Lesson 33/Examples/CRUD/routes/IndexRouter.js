import express from "express";

import IndexController from "../controllers/IndexController";

const router = express.Router();

/* GET home page. */
router.get("/", IndexController.indexView);

export { router };
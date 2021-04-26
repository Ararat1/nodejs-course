import express from "express";

import { TasksController } from "../controllers/tasksController";

const router = express.Router();

router.get("/", TasksController.index);
router.post("/", TasksController.post);

export { router };
import express from "express";

import AdminController from "../controllers/AdminController";
import { checkSign } from "../middlewares/auth";

const router = express.Router();

router.get("/", checkSign, AdminController.adminView);

export { router };
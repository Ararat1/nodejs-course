import express from "express";
import AuthController from "../controllers/AuthController";

const router = express.Router();

/* GET get register view document */
router.get("/register", AuthController.registerView);

/* POST create new user */
router.post("/register", AuthController.registerNewUser);

/* GET get login view document */
router.get("/login", AuthController.loginView);

/* POST login the user */
router.post("/login", AuthController.loginUser);

/* GET logout */
router.get("/logout", AuthController.logout);

export { router };
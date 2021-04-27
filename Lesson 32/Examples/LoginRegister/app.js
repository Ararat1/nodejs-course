import createError from "http-errors";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import logger from "morgan";

import { router as IndexRouter } from "./routes/IndexRouter";
import { router as AuthRouter } from "./routes/AuthRouter";
import { router as AdminRouter } from "./routes/AdminRouter";
import { configs } from "./config";

const app = express();

// Connect to database in Mongo Atlas
(async () => {
    try {
        await mongoose.connect(configs.database.link, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connected to database..!");
    } catch (error) {
        console.log("Database connecting error: ", error.message);
    }
})();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "Nikolay Pashinyan", saveUninitialized: true, resave: true }));
app.use(express.static(path.join(__dirname, "public")));

// handle routes
app.use("/", IndexRouter);
app.use("/auth", AuthRouter);
app.use("/admin", AdminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

export { app };
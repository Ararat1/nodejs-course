import mongoose from "mongoose";

import { database } from "./config";
import { userModel } from "./models/User";

// Connect to database in Mongo Atlas
(async () => {
    try {
        await mongoose.connect(database.link, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connected to database..!")
    } catch (error) {
        console.log("Database connecting error: ", error.message);
    }
})();

userModel
    .find({})
    .lean()
    .exec((err, result) => {
        if (err) {
            console.log(`Find error: ${err.message}`);
        } else {
            console.log(result);
        }
    });
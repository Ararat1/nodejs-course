// type "npm run example1" to start executing this program
import mongoose from "mongoose";

import { database } from "./config";
import { PersonModel } from "./models/Person";

// Connect to database in Mongo Atlas
(async () => {
    try {
        mongoose.connect(database.link, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connected to database..");
    } catch (err) {
        console.log("Database connecting error: ", err.message);
    }
})();

PersonModel
    .find()
    .sort({ age: -1 })
    .exec((err, result) => {
        if (err) {
            console.log("Find error: ", err.message);
            return;
        }

        console.log(result);
    });
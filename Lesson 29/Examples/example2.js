// type "npm run example2" to start executing this program
import mongoose from "mongoose";

import { database } from "./config";
import { PersonDetailsModel } from "./models/PersonDetails";

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

PersonDetailsModel
    .find()
    .skip(2)
    .limit(3)
    .exec((err, result) => {
        if (err) {
            console.log(("Find error: ", err.message));
            return;
        }

        console.log(result);
    });
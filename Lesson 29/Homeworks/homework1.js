// type "npm run homework1" to start executing this program
import mongoose from "mongoose";

import { database } from "./config";
import { PersonModel } from "./models/Person"

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
    .deleteOne({ name: "Sirun" })
    .exec((err, result) => {
        if(err){
            console.log("Delete error: ", err.message);
            return;
        }

        console.log("Deleted..!");
    });
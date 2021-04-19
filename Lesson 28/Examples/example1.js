import mongoose from "mongoose";

import { database } from "./config";
import { userModel } from "./model/User";

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

// get object from database
let query = userModel.findOne({}).select("email -_id");

query.exec((err, result) => {
    if (err) {
        console.log("FindOne error: ", err.message);
        return;
    }

    console.log(result);
});
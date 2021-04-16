// type "npm run homework4" to start executing this program
import mongoose from "mongoose";

import { UserModel } from "./Model/user";
import { mongodb } from "./config";

// Connect to database in Mongo Atlas
// If there are errors => show their messages in console
(async () => {
    // try to connect
    try {
        await mongoose.connect(mongodb.link, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connected to database..!");
    } catch (error) {
        console.log(error.message);
    }
})();

// Update an axisting document in database by "_id" key
// (It is optional. We may update a document by any existing field key)
UserModel.updateOne({ _id: "60796f58bdd9566910649329" }, { email: "matinyan_0@mail.ru" }, (err, result) => {
    if (err) {
        console.log("Updating Error: ", err.message);
        return;
    }

    console.log("Updated document: ", result);
});
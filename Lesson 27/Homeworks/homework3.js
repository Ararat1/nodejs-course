// type "npm run homework3" to start executing this program
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

// Create a new user buy UserModel
let user = new UserModel({
    name: "John",
    email: "Doe",
    number: "+374-77-777-777",
    message: "Hello, world..! I'm John Doe."
});

// Save created user object to database
// If there are errors => show their messages in console
user.save((err, result) => {
    if (err) {
        console.log("User save error: ", err.message);
        return;
    }

    console.log("Saved user: ", result);
});
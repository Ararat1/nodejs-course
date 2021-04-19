// type "npm run creator" to start executing this program
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

userModel.insertMany([
    { name: "Anna", email: "Anna@gmail.com", mobile: "+37491111111" },
    { name: "Maria", email: "Maria@gmail.com", mobile: "+37491222222" },
    { name: "Lara", email: "Lara@gmail.com", mobile: "+37491333333" },
    { name: "Meri", email: "Meri@gmail.com", mobile: "+37491444444" },
    { name: "Greta", email: "Gret@gmail.com", mobile: "+37491555555" },
    { name: "Sirun", email: "Sirun@gmail.com", mobile: "+37491666666" },
    { name: "ShatSirun", email: "Shatsirun@gmail.com", mobile: "+37491777777" }
], (err, result) => {
    if (err) {
        console.log("Insert error: ", err.message);
        return;
    }

    console.log(result);
});
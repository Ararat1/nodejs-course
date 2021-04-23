// type "npm run creator" to start executing this program
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

PersonModel.insertMany([
    { name: 'Anna', email: 'Anna@gmail.com', tel: '9210053520' },
    { name: 'Maria', email: 'Maria@gmail.com', tel: '9810098100' },
    { name: 'Lara', email: 'Lara@gmail.com', tel: '9210053520' },
    { name: 'Mery', email: 'Mery@gmail.com', tel: '9810098100' },
    { name: 'Greta', email: 'Greta@gmail.com', tel: '9210053520' },
    { name: 'Sirun', email: 'Sirun@gmail.com', tel: '9810098100' }
], (err) => {
    if (err) {
        console.log("Insert error: ", err.message);
        return;
    }

    console.log("Inserted..!");
    process.exit();
});
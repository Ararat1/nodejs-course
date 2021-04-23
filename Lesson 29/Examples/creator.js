// type "npm run creator" to start executing this program
import mongoose from "mongoose";

import { database } from "./config";
import { PersonModel } from "./models/Person";
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

// Save the following documents to people collection
PersonModel.insertMany([
    { name: "James", surname: "Bond", age: 65 },
    { name: "Angelina", surname: "Jolie", age: 48 },
    { name: "Mike", surname: "Tyson", age: 25 },
    { name: "Dave", surname: "Smith", age: 19 },
], (err) => {
    if (err) {
        console.log("Inserting error: ", err.message);
        return;
    }

    console.log("Inserted..!");
});

// Save the following documents to personDetails collection
PersonDetailsModel.insertMany([
    { city: 'Yerevan', weight: '45', nation: 'Arm' },
    { city: 'Moscow', weight: '60', nation: 'Ru' },
    { city: 'Berlin', weight: '28', nation: 'Ge' },
    { city: 'Paris', weight: '30', nation: 'Fr' },
    { city: 'London', weight: '80', nation: 'Eng' },
    { city: 'Yerevan', weight: '18', nation: 'Arm' },
    { city: 'Vilnius', weight: '29', nation: 'Arm' },
    { city: 'Pekin', weight: '70', nation: 'Ch' },
    { city: 'Tokio', weight: '58', nation: 'Jap' },
    { city: 'Yerevan', weight: '70', nation: 'Ind' },
    { city: 'Mexico', weight: '91', nation: 'Arm' },
    { city: 'Moscow', weight: '35', nation: 'Gr' }
], (err) => {
    if (err) {
        console.log("Inserting error: ", err.message);
        return;
    }

    console.log("Inserted..!");
});
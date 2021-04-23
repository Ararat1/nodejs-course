// type "npm run example3" to start executing this program
import http from "http";
import mongoose from "mongoose";

import { database } from "./config";
import { PersonDetailsModel } from "./models/PersonDetails";

const PORT = process.env.PORT || 8080;

// Server
const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });

    PersonDetailsModel
        .find({}, { _id: 0, city: 1 })
        .cursor()
        .on("data", (doc) => res.write(`<p>${doc.city}<p>`))
        .on("end", () => res.end("Finished..!"));
});

// Connect to database in Mongo Atlas and start server
(async () => {
    try {
        mongoose.connect(database.link, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connected to database..");

        server.listen(PORT);
        console.log(`Server has been started on port ${PORT}..`);
    } catch (err) {
        console.log("Database connecting error: ", err.message);
    }
})();
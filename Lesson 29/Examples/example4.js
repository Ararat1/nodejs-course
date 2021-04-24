// type "npm run example4" to start executing this program
import http from "http";
import mongoose from "mongoose";

import { database } from "./config";
import { PersonDetailsModel } from "./models/PersonDetails";

const PORT = process.env.PORT || 8080;

// Server
const server = http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/html" });

    // Navbar for pagination
    res.write(`<nav>
            <p><a href="/?page=1">page1</a></p>
            <p><a href="/?page=2">page2</a></p>
            <p><a href="/?page=3">page3</a></p>
        </nav></br></br>`)

    // Get the current page nubmer
    let url = new URL(`http://${req.headers.host}/${req.url}`);
    let currentPageNumber = +url.searchParams.get("page") || 1;
    let documentsCount = 3;

    // Get data from database
    PersonDetailsModel
        .find({}, { _id: 0, city: 1 })
        .skip(documentsCount * (currentPageNumber - 1))
        .limit(documentsCount)
        .exec((err, result) => {
            if (err) {
                console.log("Find error: ", err.message);
                return;
            }

            // Send received data from database to client
            result.forEach((document) => {
                res.write(`<h2>${document.city}</h2>`)
            });

            res.end();
        });
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

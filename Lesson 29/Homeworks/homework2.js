// type "npm run homework2" to start executing this program
import http from "http";
import mongoose from "mongoose";

import { database } from "./config";
import { PersonModel } from "./models/Person";

const PORT = process.env.PORT || 8080;

// Server
const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<nav>
            <a href="/?page=1">Page 1</a>
            <a href="/?page=2">Page 2</a>
            <a href="/?page=3">Page 3</a>
            <a href="/?page=4">Page 4</a>
        </nav>`);

    // Get the current page number
    let url = new URL(`https://${req.headers.host}/${req.url}`);
    let currentPageNumber = url.searchParams.get("page") || 1;
    let docsCount = 1;

    // Get limited data from database
    PersonModel
        .find({}, { _id: 0, name: 1 })
        .skip(docsCount * (currentPageNumber - 1))
        .limit(docsCount)
        // .lean()
        .exec((err, result) => {
            if (err) {
                console.log("Find error: ", err.message);
            }

            // Send received data to the client
            result.forEach(({ name }) => {
                res.write(`<h1>${name}</h1>`)
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
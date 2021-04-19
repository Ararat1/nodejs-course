// type "npm run homework4" to start executing this program// type "npm run homework2" to start executing this program
import http from "http";
import mongoose from "mongoose";
import { readFile } from "fs";

import { database } from "./config";
import { userModel } from "./models/User";

const PORT = process.env.PORT || 8080;

// Server
const server = http.createServer((req, res) => {
    userModel
        .find({})
        .select({ _id: 0, name: 1 })
        .lean()
        .exec((err, result) => {
            if (err) {
                res.end(`Find error: ${err.message}`);
            } else {
                readFile("./Views/table.html", "utf-8", (err, data) => {
                    if (err) {
                        res.end(`File read error: ${err.message}`);
                    } else {
                        let rows = "";

                        for (let { name } of result) {
                            rows += `<tr><td>${name}</td></tr>`
                        }

                        data = data.replace("{rows}", rows);

                        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                        res.end(data);
                    }
                });
            }
        });
});

// Connect to database in Mongo Atlas
(async () => {
    try {
        await mongoose.connect(database.link, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connected to database..!");

        server.listen(PORT);
        console.log(`Server has been started on ${PORT} port...`);
    } catch (error) {
        console.log("Database connecting error: ", error.message);
    }
})();
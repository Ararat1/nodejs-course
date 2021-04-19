import http from "http";
import { readFile } from "fs";
import { IncomingForm } from "formidable";
import mongoose from "mongoose";

import { database } from "./config";
import { userModel } from "./model/User";

const PORT = process.env.PORT || 8080;

// server
const server = http.createServer((req, res) => {
    if (req.url === "/search" && req.method === "POST") {
        // 1. get email from database by user name sent by client
        // 2. send the email back to the client

        IncomingForm.prototype.parse(req, (err, { username }) => {
            if (err) {
                res.end(`Form parse error: ${err.message}`);
                return;
            }

            userModel
                .findOne({ name: username }, { _id: 0, email: 1 }, (err, { email }) => { // {email} <=> result.email
                    if (err) {
                        res.end(`Find error: ${err.message}`);
                        return;
                    }

                    res.end(email);
                });
        });
    } else {
        // 1. get usernames from database
        // 2. write the usernames into <option> tags
        // 3. send form to the client to choose user and get email
        userModel
            .find({})
            .select({ _id: 0, name: 1 })
            .lean()
            .exec((err, result) => { // result is an array of objects
                if (err) {
                    res.end(`Find error: ${err.message}`);
                    return;
                }

                readFile("./Views/select.html", "utf-8", (err, data) => {
                    if (err) {
                        res.end(`Find error: ${err.message}`);
                        return;
                    }

                    let options = "";

                    for (let { name } of result) {
                        options += `<option>
                            ${name}
                            </option>`
                    }

                    data = data.replace("{options}", options);

                    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
                    res.end(data);
                });
            });
    }
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
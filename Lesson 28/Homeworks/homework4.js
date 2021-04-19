// type "npm run homework4" to start executing this program// type "npm run homework2" to start executing this program
import http from "http";
import mongoose from "mongoose";
import { IncomingForm } from "formidable";
import { readFile } from "fs";

import { database } from "./config";
import { userModel } from "./models/User";

const PORT = process.env.PORT || 8080;

// Server
const server = http.createServer((req, res) => {
    if (req.url === "/search" && req.method === "POST") {
        IncomingForm.prototype.parse(req, (err, { name }) => {
            if (err) {
                console.log(`Form parsing error: ${err.message}`)
            } else {
                userModel
                    .find({ name })
                    .select({ _id: 0, mobile: 1 })
                    .limit(1)
                    .lean()
                    .exec((err, result) => {
                        if (err) {
                            (`Find error: ${err.message}`);
                        } else {
                            res.end(result[0]["mobile"]);
                        }
                    });
            }
        });
    } else {
        userModel
            .find({})
            .select({ _id: 0, name: 1 })
            .lean()
            .exec((err, result) => {
                if (err) {
                    console.log(`Find error: ${err.message}`);
                } else {
                    readFile("./Views/select.html", "utf-8", (err, data) => {
                        if (err) {
                            console.log(`File read error: ${err.message}`);
                        } else {
                            let options = "";

                            for (let { name } of result) {
                                options += `<option>${name}</option>`
                            }

                            data = data.replace("{options}", options);

                            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                            res.end(data);
                        }
                    });
                }
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
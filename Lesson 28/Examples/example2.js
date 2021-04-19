import http from "http";
import { readFile } from "fs";
import mongoose from "mongoose";

import { database } from "./config";
import { userModel } from "./model/User";

const PORT = process.env.PORT || 8080;

// server
const server = http.createServer((req, res) => {
    // get all data from database users collection
    userModel
        .find({})
        .select({ _id: 0, name: 1, email: 1, mobile: 1 })
        .lean()
        .exec((err, result) => { // result is an array of objects
            if (err) {
                console.log("Find error: ", err.message);
                return;
            }

            readFile("./Views/table.html", "utf-8", (err, data) => {
                if (err) {
                    console.log("File read error: ", err.message);
                    return;
                }

                let rows = "";

                for (let { name, email, mobile } of result) {
                    rows += `<tr>
                    <td>${name}</td>
                    <td>${email}</td>
                    <td>${mobile}</td>
                    </tr>`;
                }

                data = data.replace("{rows}", rows);
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
                res.end(data);
            });
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
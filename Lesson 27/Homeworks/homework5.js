// type "npm run homework5" to start executing this program
import http from "http";
import { createReadStream } from "fs";
import { IncomingForm } from "formidable";
import mongoose from "mongoose";

import { UserModel } from "./Model/user";
import { mongodb } from "./config";

// Connect to database in Mongo Atlas
// If there are errors => show their messages in console
(async () => {
    // try to connect
    try {
        await mongoose.connect(mongodb.link, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connected to database..!");
    } catch (error) {
        console.log(error.message);
    }
})();

// Server
const server = http.createServer((request, response) => {
    if (request.url === "/new-message" && request.method === "POST") {
        // handle received data
        let form = new IncomingForm();

        form.parse(request, (err, { name, email, number, message }) => {
            if (err) {
                console.log(err.message);
                return;
            }

            // Save received data to database
            let newMessage = new UserModel({ name, email, number, message })

            newMessage.save((err, result) => {
                if (err) {
                    console.log("Data saving error: ", err.message);
                    return;
                }

                response.end(`${result}`);
            })
        });

        return;
    }

    let formStream = createReadStream("./View/form.html", "utf-8");

    response.writeHead(200, { "content-type": "text/html; charset=utf-8;" });
    formStream.pipe(response);
});

server.listen(8080);
console.log("Server listening port is 8080\n-----------------");
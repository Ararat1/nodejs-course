import http from "http";
import mongoose from "mongoose";
import { createReadStream, accessSync, mkdirSync } from "fs";
import { IncomingForm } from "formidable";
import mv from "mv";

import { uniqueFileName } from "./Utils/uniqueFileName";
import { mongodb } from "./config";
import { ArticleModel } from "./Model/article";

// Connect to database in Mongo Atlas
// If there are errors => show their messages
(async () => {
    try {
        await mongoose.connect(mongodb.link, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        console.log("Connected to database..!");
    } catch (error) {
        console.log("Database Connecting Error: ", error.message);
    }
})();

// Server
const server = http.createServer((request, response) => {
    if (request.url === "/save-article" && request.method === "POST") {
        // handle incoming data
        let form = new IncomingForm();

        form.parse(request, (err, { title, description, content }, { articleImage }) => {
            if (err) {
                console.log(err.message);
                return;
            }

            // If /uploads directory does not exist => creat it
            try {
                accessSync("./uploads");
            } catch (error) {
                mkdirSync("./uploads");
            }

            // moving received image to /uploads
            let newImageName = uniqueFileName(articleImage.type);

            mv(articleImage.path, `${__dirname}/uploads/${newImageName}`, () => {
                // save 'title', 'description', 'content', 'imageName' to database
                // creating new article object
                let article = new ArticleModel({ title, description, content, imageName: newImageName });

                article.save((err, result) => {
                    if (err) {
                        response.end(err.message);
                        return;
                    }

                    response.end(`${result}`);
                });
            });
        });

        return;
    }

    // send an ampty form to get data
    let formReadStream = createReadStream("./View/form.html", "utf-8");

    response.writeHead(200, { "content-type": "text/html; charset=utf-8;" });
    formReadStream.pipe(response);

});

server.listen(8080);
console.log("Server listening port is 8080\n-----------------------------------");
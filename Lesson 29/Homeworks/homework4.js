// type "npm run homework2" to start executing this program
import http from "http";
import mongoose from "mongoose";
import { IncomingForm } from "formidable";
import { createReadStream, readFile } from "fs";

import { database } from "./config";
import { UserModel, BlogModel } from "./models/models";

const PORT = process.env.PORT || 8080;

// Server
const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });

    if (req.url === "/create-user") {
        let readStreamForHTML = createReadStream("./Views/CreateUser.html", "utf-8");

        if (req.method === "POST") {
            let form = new IncomingForm();

            form.parse(req, (err, { name, email }) => {
                if (err) throw err;

                UserModel.findOne({ name }, (err, result) => {
                    if (err) throw err;


                    if (result) {
                        res.write("<h2>Such username is already taken..!</h2>");
                        readStreamForHTML.pipe(res);
                    } else {
                        let newUser = new UserModel({ name, email });
                        newUser.save((err) => {
                            if (err) throw err;

                            res.write("<h2>Saved..!</h2>");
                            readStreamForHTML.pipe(res);
                        });
                    }
                });
            });
        } else {
            let readStreamForHTML = createReadStream("./Views/CreateUser.html", "utf-8");
            readStreamForHTML.pipe(res);
        }
    } else if (req.url === "/create-blog") {
        let readStreamForHTML = createReadStream("./Views/CreateBlog.html", "utf-8");

        if (req.method === "POST") {
            let form = new IncomingForm();

            form.parse(req, (err, { title, body, author }) => {
                if (err) throw err;

                let newBlog = new BlogModel({ title, body, author });

                newBlog.save((err) => {
                    if (err) throw err;

                    UserModel
                        .find({}, { name: 1 })
                        .sort({ name: 1 })
                        .lean()
                        .exec((err, docs) => {
                            if (err) throw err;

                            readFile("./Views/CreateBlog.html", "utf-8", (err, data) => {
                                if (err) throw err;

                                let options = "";

                                docs.forEach(({ _id, name }) => {
                                    options += `<option value="${_id}">${name}</option>`
                                })

                                data = data.replace("{options}", options);
                                res.write("<h2>Saved..!</h2>");
                                res.end(data);
                            });
                        });
                });
            });
        } else {
            UserModel
                .find({}, { name: 1 })
                .sort({ name: 1 })
                .lean()
                .exec((err, docs) => {
                    if (err) throw err;

                    readFile("./Views/CreateBlog.html", "utf-8", (err, data) => {
                        if (err) throw err;

                        let options = "";

                        docs.forEach(({ _id, name }) => {
                            options += `<option value="${_id}">${name}</option>`
                        })

                        data = data.replace("{options}", options);
                        res.end(data);
                    });
                });
        }
    } else {
        BlogModel
            .find({}, { _id: 0, title: 1, body: 1, author: 1 })
            .populate({ path: "author", select: "-_id name" })
            .lean()
            .exec((err, docs) => {
                if (err) throw err;

                readFile("./Views/Blogs.html", "utf-8", (err, data) => {
                    if (err) throw err;

                    let cards = "";

                    docs.forEach(({ title, body, author: { name } }) => {
                        cards += `<div class="col-sm-6">
                            <div class="card w-100">
                                <div class="card-body">
                                    <h5 class="card-title">${title}</h5>
                                    <p class="card-text">${body}</p>
                                    <a href="#" class="link-primary">${name}</a>
                                </div>
                            </div>`;
                    });

                    data = data.replace("{cards}", cards);
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(data);
                });
            });
    }
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
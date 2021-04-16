import mongoose from "mongoose";
import { mongodb } from "./config";
import { ArticleModel } from "./Model/article";

// Connect to database in Mongo Atlas
// If there are errors => show their messages
(async () => {
    // check connection
    try {
        await mongoose.connect(mongodb.link, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to database..!");
    } catch (error) {
        console.log(error.message);
    }
})();

// Create articles by ArticleModel
let article0 = new ArticleModel({
    title: "Article 0",
    description: "First article",
    content: "Hello, world..!!!",
    imageName: "hello.jpg"
});

let article1 = new ArticleModel({
    title: "Article 1",
    description: "Description 1",
    content: "Lorem ipsum..",
    imageName: "lorem.jpg"
});

// Save created articles to database and 
// If there are errors => show their messages
article0.save((err, result) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Article 0: ", result);
    }
});

article1.save((err, result) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Article 0: ", result);
    }
});
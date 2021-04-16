import mongoose from "mongoose";
import { mongodb } from "./config";
import { ArticleModel } from "./Model/article";

// Connect to database in Mongo Atlas
// If there are errors => show their messages
(async () => {
    try {
        await mongoose.connect(mongodb.link, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connected to database..!")
    } catch (error) {
        console.log(error.message);
    }
})();

// Update an axisting document in database by "_id" key
// (It is optional. We may update a document by any existing field key)
ArticleModel.updateOne({ _id: "60794c4890d8e9478b83df21" }, {
    title: "New Title",
    description: "New Description"
}, (err, result) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Updating result: ", result);
    }
});
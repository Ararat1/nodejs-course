import express from "express";
import random from "random";

// Constants
const app = express();
const PORT = process.env.PORT || 8080;

// App settings
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

// Handle routes
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/info", (req, res) => {
    let data = {
        name: "Ararat",
        email: "matinyan_0@mail.ru",
        languages: ["JavaScript", "Python", "PHP", "C", "C++"]
    };

    res.render("info", { data });
});

app.get("/random", ({ query: { min, max } }, res) => {
    if (min && max) {
        res.render("random", { random: random.int(+min, +max) });
    } else {
        res.render("random", { random: "" });
    }
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.post("/contact", (req, res) => {
    res.render("contact-success", { ...req.body });
});

// Start server
app.listen(PORT, () => console.log(`Server has been started on ${PORT} port.`));
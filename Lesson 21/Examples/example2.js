const http = require("http")

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8;");

    switch (req.url) {
        case "/":
            res.statusCode = 302
            res.setHeader("Location", "/new-page")
            break;
        case "/new-page":
            res.write("<h1>Welcome to new page...!!</h1>")
            break;
        default:
            res.statusCode = 404
            res.write("<h2>Not founf .. :(</h2>")
    }

    res.end()
}).listen(3333)
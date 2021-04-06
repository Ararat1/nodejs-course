const http = require("http")

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8;")

    switch (req.url) {
        case "/":
        case "/home":
            res.write("<h1>Home</h1>")
            break;
        case "/about":
            res.write("<h1>About</h1>")
            break;
        case "/contact":
            res.write("<h1>Contact</h1>")
            break;
        default:
            res.write("<h1>Not fount.. :(</h1>")
    }

    res.end()
})

server.listen(8080)
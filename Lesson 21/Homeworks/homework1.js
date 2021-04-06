const http = require("http")

const server = http.createServer((req, res) => {
    if (req.url === "/sunny") console.log("Yes")
    res.end()
}).listen(8080)
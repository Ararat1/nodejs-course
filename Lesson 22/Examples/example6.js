const http = require("http")

const server = http.createServer((req, res) => {
    res.writeHead(200, "All is Ok!", { "Content-Type": "text/plain" })
    res.end("ASDDSA")
})

server.listen(8080)
console.log("PORT is 8080")
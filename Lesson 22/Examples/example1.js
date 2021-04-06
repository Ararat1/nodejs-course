const http = require("http")

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" })
    res.write("Hello, world..!!!")
    res.end("<h1>Ararat Matinyan</h1>")
})

server.listen(8080)
console.log("PORT 8080")
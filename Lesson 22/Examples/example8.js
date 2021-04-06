const http = require("http")
const { createReadStream } = require("fs")

const server = http.createServer((req, res) => {
    let rStream = createReadStream("./example.json")

    res.writeHead(200, { "Content-Type": "application/json" })

    rStream.pipe(res)
})

server.listen(8080)
console.log("PORT is 8080")
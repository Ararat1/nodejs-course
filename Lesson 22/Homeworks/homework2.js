const http = require("http")
const { createReadStream } = require("fs")

const server = http.createServer((req, res) => {
    const img = createReadStream("./sunny.jpg")

    if (req.url === "/download-image") {
        res.writeHead(200, { "Content-Type": "application/jpeg" })
        img.pipe(res)
        return
    }

    if (req.url === "/image") {
        res.writeHead(200, { "content-type": "image/jpeg" })
        img.pipe(res)
        return
    }

    res.end("Not found")

})

server.listen(8080)
console.log("PORT is 8080")
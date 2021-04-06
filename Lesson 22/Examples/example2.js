const http = require("http")
const { createReadStream } = require("fs")

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" })

    if (req.url === "/example") {
        const htmlFileStream = createReadStream("./example2.html")
        htmlFileStream.pipe(res)
    } else {
        // res.setHeader(301, { "location": "localhost:8080/example" })
        // res.end()
        res.write("Go to the Example </br>")
        res.end('<a href="/example">Example<a>')
    }
})

server.listen(8080)
console.log("PORT: 8080")
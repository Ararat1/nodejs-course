const http = require("http")

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader("location", "http://localhost:8080/contacts")
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate")
    res.setHeader("Expires", 0)
    res.end("Hello..!")
})

server.listen(8080)
console.log("PORT IS 8080")
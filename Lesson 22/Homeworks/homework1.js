const http = require("http")

const server = http.createServer((req, res) => {
    for (let i = 1; i <= 100; i++) {
        res.write(i + "\n")
    }
    res.end()
})

server.listen(8080)
console.log("PORT is 8080")
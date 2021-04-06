const http = require("http")

const server = http.createServer((req, res) => {
    console.log(req.url.length)
    res.end()
}).listen(3000)
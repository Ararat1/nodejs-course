const http = require("http")

const server = http.createServer((req, res) => {

    console.log(`Request for ${req.method} receied`)

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" })
    res.end(`<form action="/" method="POST">
        <input type="name">
        <button type="submit">Submit</button>
    </form>`)
})

server.listen(8080)
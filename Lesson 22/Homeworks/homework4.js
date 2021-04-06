const http = require("http")
const { createReadStream, readFile } = require("fs")

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" })

    let url = new URL("http://" + req.headers.host + req.url)
    let queryParams = Object.fromEntries(url.searchParams.entries());

    if (queryParams.name && queryParams.message) {
        readFile("./jsonView.html", "utf-8", (err, data) => {
            if (err) throw err

            let json = JSON.stringify(queryParams, null, 2)

            data = data.replace("{JSON}", json)

            res.end(data)
        })
    } else {
        const formStream = createReadStream("./form2.html")
        formStream.pipe(res)
    }
})

server.listen(8080)
console.log("PORT is 8080")
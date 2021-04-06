const http = require("http")
const queryString = require("querystring")

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf8;" })

    if (req.method === "POST") {
        req.setEncoding("utf-8")

        let body = ""

        req.on("data", (chunk) => {
            body += chunk
        })

        req.on("end", () => {
            res.end(queryString.parse(body))
        })
    }

    res.end(`
        <form action="/" method="POST">
            <input type="text" name="name" placeholder="Enter your name"/>
            <button type="submit">Submit</button>
        </form>`)
}).listen(8080)
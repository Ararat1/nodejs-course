const http = require("http")
const querystring = require("querystring")
const { createReadStream } = require("fs")

const inputView = () => {
    return `<form method="POST">
                <input type="text" name="content">
                <button type="submit">Submit</button>
            </form>`
}

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" })

    if (req.method === "POST") {
        let body = ""

        req.setEncoding("utf-8")
        req.on("data", (chunk) => body += chunk)
        req.on("end", () => {
            let { content } = querystring.parse(body)

            if (content.trim().toLowerCase() === 'form') {
                let formStream = createReadStream("./form.html")
                formStream.pipe(res)
            } else {
                res.end(inputView())
            }
        })
    } else {
        res.end(inputView())
    }
})

server.listen(8080)
console.log("PORT is 8080")
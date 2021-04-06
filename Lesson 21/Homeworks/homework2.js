const http = require("http")
const querystring = require("querystring")
const url = require("url")

const server = http.createServer((req, res) => {
    let requestObj = querystring.parse(req.url)

    if (requestObj["/?content"]) {
        res.end(requestObj["/?content"])
    } else {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" })
        res.end(`<form action="/">
                <input type="text" name="content">
                <button type="submit">Submit</button>
            </form>`)
    }
})

server.listen(8080)
console.log("PORT 8080")
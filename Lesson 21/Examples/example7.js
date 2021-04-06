const http = require("http")
const querystring = require("querystring")

const server = http.createServer((req, res) => {
    if (req.method === "POST") {
        let requestBody = ""

        req.on("data", (chunk) => requestBody += chunk)
        req.on("end", () => {
            let content = querystring.parse(requestBody).content

            if (content == "Sunny") res.end("Welcome..!!")
        })
    } else {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" })
        res.end(`<form action="/" method="POST">
                <input type="text" name="content">
                <button type="submit">Submit</button>
            </form>`)
    }
})

server.listen(8080)
console.log("PORT: 8080")
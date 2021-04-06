const http = require("http")
const querystring = require("querystring")
const { rename } = require("fs")

const server = http.createServer((req, res) => {
    if (req.method === "POST") {
        let requestBody = ""

        req.setEncoding("utf-8")
        req.on("data", (chunk) => requestBody += chunk)
        req.on("end", () => {
            let content = querystring.parse(requestBody).content

            rename("./homework3.txt", `${content}.txt`, () => res.end("Done..!!!"))
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
console.log("PORT 8080")
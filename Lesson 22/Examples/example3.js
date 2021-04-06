const http = require("http")
const { createReadStream } = require("fs")
const querystring = require("querystring")

const server = http.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/image") {
        let body = ""

        req
            .on("data", (chunk) => body += chunk)
            .on("end", () => {
                let { image: imgName } = querystring.parse(body)

                let imgReadStream = createReadStream(`./Images/${imgName}.jpeg`)

                imgReadStream.pipe(res)
                // res.end()
            })
    } else {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" })
        res.end(`<form action="/image" method="POST">
                <select name="image">
                    <option value="img1">Image 1</option>
                    <option value="img2">Image 2</option>
                </select>
                <button type="submit">Select Image</button>
            </form>`)
    }
})

server.listen(8080)
console.log("PORT is 8080")
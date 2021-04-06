const http = require("http")
const querystring = require("querystring")

const formView = () => {
    return `<form action="/api" method="GET">
                <input name="name" /> <br>
                <textarea name="message"></textarea> <br>
                <button type="submit">Select Image</button>
            </form>`
}

const server = http.createServer((req, res) => {
    let url = new URL(`http://${req.headers.host}${req.url}`)

    if (url.search) {
        let obj = querystring.parse(url.searchParams.toString())
        res.end(JSON.stringify(obj))
        return
    }

    // Show html form 
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" })
    res.end(formView())
})

server.listen(8080)
console.log("PORT is 8080")
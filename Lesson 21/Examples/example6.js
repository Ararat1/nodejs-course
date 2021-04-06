const http = require("http")
const querystring = require("querystring")

let date = new Date()

let timeObj = {
    d: date.getDay(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
}

let timeStr = querystring.stringify(timeObj)

const server = http.createServer((req, res) => {
    res.end(`<a href="/?${timeStr}">Link</a >`)
})

server.listen(8080)
console.log("Port: 8080")
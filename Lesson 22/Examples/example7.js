const http = require("http")

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" })

    res.write("<html>")
    res.write("<head>")
    res.write("<title>Hello</title>")
    res.write("</head>")
    res.write("<body>")
    res.write("<h1>Hello, world!</h1>")
    res.write("</body>")
    res.write("</html>")
    res.end()
})

server.listen(8080)
console.log("PORT is 8080")
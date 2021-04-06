const http = require("http")
const url = require("url")
const { mkdirSync, existsSync, writeFile } = require("fs")

const server = http.createServer((req, res) => {
    const { query: { username, message } } = url.parse(req.url, true)

    if (username && message) {
        if (!existsSync("./Homework5")) mkdirSync("./Homework5")

        writeFile(`./Homework5/${username}.txt`, message, () => {
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" })
            res.end(`<form action="/" name="message">
                    <p><input type="text" name="username"></p>
                    <p><textarea name="message" cols="30" rows="10"></textarea></p>
                    <button type="submit">Submit</button>
                </form>`)
        })

    } else {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" })
        res.end(`<form action="/" name="message">
                <p><input type="text" name="username"></p>
                <p><textarea name="message" cols="30" rows="10"></textarea></p>
                <button type="submit">Submit</button>
            </form>`)
    }
})

server.listen(8080)
console.log("PORT 8080...")
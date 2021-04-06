const http = require("http")
const { IncomingForm } = require("formidable")
const { rename } = require("fs")

const formView = () => {
    return `<form action="/upload" method="POST" enctype="multipart/form-data">
                <input type="text" name="username" />
                <input type="file" name="image">
                <button type="submit">Send</button>
            </form>`
}

const server = http.createServer((req, res) => {
    if (req.url === "/upload") {
        let form = new IncomingForm()

        form.parse(req, (err, fields, files) => {
            // console.log(files)
            let oldPath = files.image.path
            let newPath = __dirname + files.image.name

            rename(oldPath, newPath, (err) => {
                if (err) throw err
                res.end("File uploaded...!!!!")
            })
        })
    } else {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" })
        res.end(formView())
    }
})

server.listen(8080)
console.log("PORT is 8080")
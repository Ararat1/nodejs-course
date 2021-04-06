const http = require("http")
const { IncomingForm } = require("formidable")
const { readFile } = require("fs")

const formView = () => {
    return `<form action="/upload" method="POST" enctype="multipart/form-data">
                <input type="file" name="uploadedFile">
                <button type="submit">Upload</button>
            </form>`
}

const server = http.createServer((req, res) => {
    if (req.url === "/upload") {
        let form = new IncomingForm()

        form.parse(req, (err, field, { uploadedFile }) => {
            // Check for errors
            if (err) throw err

            // Send received data back
            readFile(uploadedFile.path, (err, data) => res.end(data))
        })
    } else {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" })
        res.end(formView())
    }
})

server.listen(8080)
console.log("PORT is 8080")
const http = require("http")
const { existsSync, mkdirSync } = require("fs")
const { IncomingForm } = require("formidable")
const random = require("random")
const mv = require("mv")

const formView = () => {
    return `<form action="/upload" method="POST" enctype="multipart/form-data">
                <input type="file" name="uploadFile">
                <button type="submit">Upload</button>
            </form>`
}

const server = http.createServer((req, res) => {
    if (req.url === "/upload" && req.method === "POST") {
        let form = new IncomingForm()

        form.parse(req, (err, fields, { uploadFile }) => {
            if (err) throw err

            if (!existsSync("./upload")) mkdirSync("./upload")

            let newFileName = random.int(1e5, 1e6 - 1) + ""
            newFileName += "." + uploadFile.type.split("/")[1]
            newFileName = __dirname + "/upload/" + newFileName

            mv(uploadFile.path, newFileName, () => res.end("Uploaded..!!!"))
        })

    } else {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" })
        res.end(formView())
    }

})

server.listen(8080)
console.log("PORT is 8080")
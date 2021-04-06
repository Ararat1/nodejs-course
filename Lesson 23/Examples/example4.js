const http = require("http")
const { IncomingForm } = require("formidable")
const random = require("random")
const mv = require("mv")

const formView = () => {
    return `<form action="/upload" method="POST" enctype="multipart/form-data">
                <input type="file" name="uploadedImage">
                <button type="submit">Upload</button>
            </form>`
}

const server = http.createServer((req, res) => {
    if (req.url === "/upload") {
        let form = new IncomingForm()

        form.parse(req, (err, field, { uploadedImage }) => {
            // Check for errors
            if (err) throw err

            // Creating a new filename
            let filename = ""

            for (let i = 0; i < 5; i++) filename += String.fromCharCode(random.int(97, 122))

            let ext = uploadedImage.type.split("/")[1]
            let newFilename = `${__dirname}/uploads/${filename}.${ext}`

            // Renaming and moving the uploaded image
            mv(uploadedImage.path, newFilename, () => res.end("Uploaded..!!!"))
        })
    } else {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" })
        res.end(formView())
    }
})

server.listen(8080)
console.log("PORT is 8080")
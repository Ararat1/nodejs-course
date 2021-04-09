import { createReadStream, accessSync, mkdirSync, readFileSync } from "fs"
import http from "http"
import { IncomingForm } from "formidable"
import mv from "mv"
import sharp from "sharp"

import { uniqueFileName } from "./Utils/uniqueFileName.js"

const server = http.createServer((req, res) => {
    if (req.method === "POST") {
        let form = new IncomingForm()

        form.parse(req, (err, fields, { avatar }) => {
            if (err) throw err

            // Creating a new file
            let filename = uniqueFileName(avatar.type)
            let filepath = `${__dirname}/upload/${filename}`

            try {
                accessSync("./upload")
            } catch (e) {
                mkdirSync("./upload")
            }

            mv(avatar.path, filepath, () => {
                sharp(`./upload/${filename}`)
                    .resize(150, 100)
                    .jpeg({ mozjpeg: true })
                    .toFile(`./upload/_${filename}`)
                    .then(() => {
                        let image = readFileSync(`./upload/_${filename}`)

                        res.writeHead(200, { "Content-Type": "image/jpeg" })
                        res.end(JSON.stringify({ img: image }))
                    })
            })
        })
    }

    else {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" })

        let htmlStream = createReadStream("./Views/index.html")

        htmlStream.pipe(res)
        htmlStream.on("end", () => res.end())
    }
})

server.listen(8080)
console.log("PORT is 8080")
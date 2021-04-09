const http = require("http")
const { readFileSync } = require("fs")
const { IncomingForm } = require("formidable")
const nodemailer = require("nodemailer")

const formView = () => {
    return (
        `<form action="/send-email" method="POST" enctype="multipart/form-data" name="messageForm">
            <p>
                <input type="email" name="email" placeholder="@ Email">
            </p>
            <p>
                <input type="text" name="subject" placeholder="Subject">
            </p>
            <p>
                <input type="file" name="sendFile">
            </p>
            <button type="submit">Send</button>
        </form>`
    )
}

const server = http.createServer((req, res) => {
    if (req.url === "/send-email" && req.method === "POST") {
        // If there are incoming data from the form => handle them
        // else send back an empty form

        let form = new IncomingForm()

        form.parse(req, (err, { email, subject }, { sendFile }) => {
            // If the file is a text file => send an email with the file 
            // If the file extantion isn't .txt => send back an empty form
            if (err) throw err

            if (sendFile.type === "text/plain") {
                const config = {
                    service: "gmail",
                    auth: {
                        user: "gevorgabgaryanfornodecourse@gmail.com",
                        pass: "Sunny_School+-+"
                    },
                    tis: {
                        rejectUnauthorized: false
                    }
                    ,
                    debug: true,
                }

                const transporter = nodemailer.createTransport(config)

                transporter.verify((err) => { if (err) throw err })

                const mailOption = {
                    to: email,
                    subject: subject,
                    text: readFileSync(sendFile.path)
                }

                transporter.sendMail(mailOption, (err, info) => {
                    if (err) throw err

                    res.writeHead(200, { "content-type": "application/json" })
                    res.end(JSON.stringify(info))
                })
            } else {
                res.writeHead(200, { "content-type": "text/html; charset=utf-8;" })
                res.end(formView())
            }
        })
    } else {
        res.writeHead(200, { "content-type": "text/html; charset=utf-8;" })
        res.end(formView())
    }
})

server.listen(8080)
console.log("PORT is 8080")
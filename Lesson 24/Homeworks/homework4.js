const http = require("http")
const { IncomingForm } = require("formidable")
const { isEmail } = require("validator")
const nodemailer = require("nodemailer")

const formView = () => {
    return (
        `<form action="/send-email" method="POST" name="messageForm">
            <p>
                <input type="text" name="email" placeholder="@ Email">
            </p>
            <button type="submit">Send</button>
        </form>`
    )
}

const server = http.createServer((req, res) => {
    if (req.url === "/send-email" && req.method === "POST") {
        // If there is received data => handle it
        // otherwise send back an empty form to get data
        let form = new IncomingForm()

        form.parse(req, (err, { email }) => {
            // check out email address
            // if email is valid => send sunny.jpg to email
            // otherwise send back an empty form and message that email was invalid
            if (isEmail(email)) {
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
                    subject: "Sunny Preview",
                    html: '<p>Received image:</p><br> <img src="cid:unique-sunny.jpg"/>',
                    attachments: {
                        filename: "sunny.jpg",
                        path: __dirname + "/sunny.jpg",
                        cid: "unique-sunny.jpg"
                    }
                }

                transporter.sendMail(mailOption, (err, info) => {
                    if (err) throw err

                    res.writeHead(200, { "content-type": "application/json" })
                    res.end(JSON.stringify(info))
                })
            } else {
                res.writeHead(200, { "content-type": "text/html; charset=utf-8;" })
                res.write("<p><mark>Invalid Email address.. Try again</mark></p>")
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
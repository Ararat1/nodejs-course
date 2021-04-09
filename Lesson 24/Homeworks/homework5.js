const http = require("http")
const { readFile, writeFileSync } = require("fs")
const { IncomingForm } = require("formidable")
const nodemailer = require("nodemailer")

const formView = () => {
    return (
        `<form action="/send-email" method="POST" name="messageForm">
            <p>
                <input type="text" name="to" placeholder="@ Email">
            </p>
            <p>
                <input type="text" name="subject" placeholder="Subject">
            </p>
            <p>
                <textarea name="text" cols="30" rows="10" placeholder="Text"></textarea>
            </p>
            <button type="submit">Send</button>
        </form>`
    )
}

const emailArticleView = (to, subject, text) => {
    return (
        `<div class="card col-12">
            <h1 class="card-title">${to}</h1>
            <h2 class="card-subtitle">${subject}</h2>
            <p class="card-text">${text}</p>
        </div>
        <span hidden>{article}</span>`
    )
}

const server = http.createServer((req, res) => {
    if (req.url === "/send-email" && req.method === "POST") {
        // If there is received data => handle it
        // otherwise send back an empty form to get data
        let form = new IncomingForm()

        form.parse(req, (err, { to, subject, text }) => {
            // send an email
            // after that save the message article in mail.html
            if (err) throw err

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

            const mailOption = { to, subject, text }

            transporter.sendMail(mailOption, (err, info) => {
                // add an email article to mail.html
                // send mail.html as server response
                if (err) throw err

                readFile("./mail.html", "utf-8", (err, data) => {
                    if (err) throw err

                    data = data.replace("<span hidden>{article}</span>", emailArticleView(to, subject, text))

                    res.writeHead(200, { "content-type": "text/html; charset=utf-8;" })
                    res.on("finish", () => writeFileSync("./mail.html", data))
                    res.end(data)
                })
            })
        })
    } else {
        res.writeHead(200, { "content-type": "text/html; charset=utf-8;" })
        res.end(formView())
    }
})

server.listen(8080)
console.log("PORT is 8080")
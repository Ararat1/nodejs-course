const nodemailer = require("nodemailer")

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

transporter.verify((err) => {
    if (err) throw err

    console.log("Connected to smtp server")
})

const mailOption = {
    to: "matinyan.ar69@mail.ru",
    text: "New Article",
}

let h = new Date().getHours()

if (h >= 12 && h <= 13) {
    transporter.sendMail(mailOption, (err) => { if (err) throw err })
}
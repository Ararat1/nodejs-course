const { readFileSync } = require("fs")
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
    subject: "NodeJS BG1219 | Lesson 24 Homeworks",
    text: readFileSync("./Homeworks.txt")
}

transporter.sendMail(mailOption, (err) => { if (err) throw err })
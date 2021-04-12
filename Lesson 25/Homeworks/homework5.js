// type "npm run homework3.js to run"
import http from "http"
import mysql from "mysql"
import { IncomingForm } from "formidable"
import isEmpty from "validator/lib/isEmpty"
import isLength from "validator/lib/isLength"
import isAlphanumeric from "validator/lib/isAlphanumeric"
import isEmail from "validator/lib/isEmail"
import isMobilePhone from "validator/lib/isMobilePhone"

// create connection to users database in the local server
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ararat",
    database: "ararat"
})

// Connect to database
connection.connect((err) => {
    if (err) throw err
    console.log("Connected to database")
})

// returns an html form element
const formView = () => {
    return (
        `<form action="/send-data" method="POST">
            <p>
                <input type="text" name="name" placeholder="name">
            </p>
            <p>
                <input type="email" name="email" placeholder="email">
            </p>
            <p>
                <input type="text" name="number" placeholder="number">
            </p>
            <button type="submit">Send</button>
        </form>`
    )
}

// server
const server = http.createServer((req, res) => {
    if (req.url === "/send-data" && req.method === "POST") {
        let form = new IncomingForm()

        // handle received data
        form.parse(req, (err, { name, email, number }) => {
            if (err) throw err

            // validate received data
            let validationFlags = new Set()
            // for name
            validationFlags.add(!isEmpty(name) &&
                isAlphanumeric(name, "en-US") &&
                isLength(name, { min: 2, max: 255 }))
            // for email
            validationFlags.add(!isEmpty(email) && isEmail(email))
            // for number
            validationFlags.add(!isEmpty(number) && isMobilePhone(number, "am-AM"))

            // if all the fields are valid => add the into database in users table
            // else send back an empty form to get valid data
            if (!validationFlags.has(false)) {
                // removing " | ' | `
                name = connection.escape(name)
                email = connection.escape(email)
                number = connection.escape(number)

                // SQL query to add received data to users table in ararat database
                let sql = `INSERT INTO users (name, email, number) VALUES (${name}, ${email}, ${number})`

                connection.query(sql, (err) => {
                    if (err) throw err
                    console.log("Inserted..!")

                    res.writeHead(200, { "content-type": "text/html; charset=utf-8;" })
                    res.write("<h3>Completed..!</h3>")
                    res.end(formView())
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
console.log("PORT is 8080\n-------------------------------------")
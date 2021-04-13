// type "npm run homework4" to start executing this program
import http from "http"
import mysql from "mysql"
import { readFile } from "fs"
import { IncomingForm } from "formidable"

// create connection to database
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ararat",
    database: "Homework11"
})

// connect to database
con.connect((err) => {
    if (err) throw err
    console.log("Connected to database..!")
})

// server
const server = http.createServer((req, res) => {
    // if there is received data from client => handle it => get needed data from database => send back the data
    // else show select.html with usernames from database
    if (req.url = "/search" && req.method === "POST") {
        let form = new IncomingForm()

        form.parse(req, (err, { username }) => {
            if (err) throw err

            let sql = `SELECT email FROM tableinfo WHERE name='${username}'`

            con.query(sql, (err, [{ email }]) => {
                if (err) throw err

                res.end(`${username} email is: ${email}`)
            })
        })
    } else {
        let sql = "SELECT name FROM tableinfo ORDER BY name ASC"

        con.query(sql, (err, result) => {
            if (err) throw err

            readFile("./Views/select.html", "utf-8", (err, data) => {
                if (err) throw error

                let options = ""

                for (let { name } of result)
                    options += `<option>${name}</option>`

                data = data.replace("{options}", options)

                res.writeHead(200, { "content-type": "text/html; charset=utf-8;" })
                res.end(data)
            })
        })
    }
})

server.listen(8080)
console.log("PORT is 8080\n-----------------------")
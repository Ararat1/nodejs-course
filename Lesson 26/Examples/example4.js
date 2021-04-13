import http from "http"
import mysql from "mysql"
import { IncomingForm } from "formidable"
import { readFile } from "fs"

// create connection to database
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ararat",
    database: "Example11"
})

// connect to database
con.connect((err) => {
    if (err) throw err
    console.log("Connected to database..!")
})

// server
const server = http.createServer((req, res) => {
    if (req.url === "/select" && req.method === "POST") {
        // get id from client
        // get username from database by id
        // send back username

        let form = new IncomingForm()

        form.parse(req, (err, { user_id }) => {
            let sql = `SELECT email FROM tableinfo WHERE id=${user_id}`
            con.query(sql, (err, result) => {
                if (err) throw err

                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" })
                res.end(`<h1>${result[0].email}</h1>`)
            })
        })
    } else {
        // get all id-s from database
        // write them into <select>
        // send back <select> select
        let sql = "SELECT id FROM tableinfo"

        con.query(sql, (err, result) => {
            if (err) throw err

            // get select html
            // write there gotten id-s
            readFile("./select.html", "utf-8", (err, data) => {
                if (err) throw err

                let selectOptions = ""

                for (let row of result) {
                    let option = `<option value="${row.id}">${row.id}</option>`
                    selectOptions += option;
                }

                data = data.replace("{options}", selectOptions)

                res.writeHead(200, { "content-type": "text/html; charset=utf-8;" })
                res.end(data)
            })
        })
    }
})

server.listen(8080)
console.log("PORT is 8080\n--------------------------------------")
// type "npm run homework1" to start executing this program
import http from "http"
import mysql from "mysql"
import { readFile } from "fs"

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
    // get data from dataabse
    // write the data into table.html
    // send back changed table.html as response
    let sql = "SELECT * FROM tableinfo"

    con.query(sql, (err, result) => {
        if (err) throw err

        readFile("./Views/table.html", "utf-8", (err, data) => {
            if (err) throw err

            let rows = ""

            for (let { id, name, email, mobile } of result) {
                let newRow = `
                    <tr>
                        <td>${id}</td>
                        <td>${name}</td>
                        <td>${email}</td>
                        <td>${mobile}</td
                    </tr>`

                rows += newRow
            }

            data = data.replace("{data}", rows)

            res.writeHead(200, { "content-type": "text/html; charset=utf-8;" })
            res.end(data)
        })
    })
})

server.listen(8080)
console.log("PORT is 8080\n-------------------")
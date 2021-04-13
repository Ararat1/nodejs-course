import mysql from "mysql"
import { readFile } from "fs"
import http from "http"

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
    // get data from database
    let sql = "SELECT * FROM tableinfo"

    con.query(sql, (err, result) => {
        if (err) throw err

        // send result to client
        readFile("./table.html", "utf-8", (err, data) => {
            if (err) throw err

            let rows = ""

            for (let row of result) {
                let tableRow = `<tr>
                        <td>${row.id}</td>    
                        <td>${row.name}</td>    
                        <td>${row.email}</td>    
                        <td>${row.mobile}</td>    
                    </tr>`

                rows += tableRow
            }

            data = data.replace("{data}", rows)

            res.writeHead(200, { "content-type": "text/html; charset=utf-8;" })
            res.end(data);
        })
    })
})

server.listen(8080)
console.log("PORT is 8080\n--------------------------------------")
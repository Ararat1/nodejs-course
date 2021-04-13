// type "npm run example5" to start executing this program
import http from "http"
import mysql from "mysql"
import { readFile } from "fs"
import { IncomingForm } from "formidable"

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
    if (req.url === "/search" && req.method === "POST") {
        // get data from client
        // get searched rows by searchstring
        // send back table.html as the server response with data

        let form = new IncomingForm()

        form.parse(req, (err, { search_string }) => {
            if (err) throw err

            let sql = `SELECT * FROM tableinfo WHERE name LIKE '%${search_string}%' OR email LIKE '%${search_string}%'`

            con.query(sql, (err, result) => {
                if (err) throw err

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
    }
    else {
        // reada html data from search.html
        // send the data to client to search data in database
        readFile("./search.html", "utf-8", (err, data) => {
            if (err) throw err

            res.writeHead(200, { "content-type": "text/html; charset=utf-8;" })
            res.end(data)
        })
    }
})

server.listen(8080)
console.log("PORT is 8080\n--------------------------------------")
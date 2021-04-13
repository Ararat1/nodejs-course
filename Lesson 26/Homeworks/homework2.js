// type "npm run homework2" to start executing this program
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
    // write the data into list.html
    // send back changed list.html as response
    let sql = "SELECT * FROM tableinfo LIMIT 1"

    con.query(sql, (err, [{ id, name, email, mobile }]) => {
        if (err) throw err

        readFile("./Views/list.html", "utf-8", (err, data) => {
            if (err) throw err

            let listItems = `
                <li>${id}</li>
                <li>${name}</li>
                <li>${email}</li>
                <li>${mobile}</li>`

            data = data.replace("{data}", listItems)

            res.writeHead(200, { "content-type": "text/html; charset=utf-8;" })
            res.end(data)
        })
    })
})

server.listen(8080)
console.log("PORT is 8080\n-------------------")
// type "npm run homework5" to start executing this program
import http, { METHODS } from "http"
import mysql from "mysql"
import { IncomingForm } from "formidable"
import { readFile } from "fs"

// create connection to database
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ararat",
    database: "Homework11"
})

// connect to database and create new table
con.connect((err) => {
    if (err) throw err
    console.log("Connected to database..!")

    let sql = `CREATE TABLE IF NOT EXISTS tableArticles (
        id int auto_increment primary key,
        title varchar(255) not null,
        description varchar(255) not null,
        content varchar(255) not null
    )`

    con.query(sql, (err) => {
        if (err) throw err
        console.log("tableArticles is created")
    })


})

// view
const refreshPage = (res) => {
    let sql = `SELECT title, description, content FROM tableArticles`

    con.query(sql, (err, result) => {
        if (err) throw err

        let articleCards = ""

        for (let { title, description, content } of result) {
            let newArticleCard = `<div class="article col-12">
                    <div class="card">
                        <h5 class="card-header">${title}</h5>
                        <div class="card-body">
                            <h5 class="card-title">${description}</h5>
                            <p class="card-text">${content}</p>
                        </div>
                    </div>
                </div>`

            articleCards += newArticleCard;
        }

        readFile("./Views/messages.html", "utf-8", (err, data) => {
            if (err) throw err

            data = data.replace("{articles}", articleCards)

            res.writeHead(200, { "content-type": "text/html; charset=utf-8;" })
            res.end(data)
        })
    })
}

// server
const server = http.createServer((req, res) => {
    // get received messages from client
    // insert them into database
    // show data from satabase
    if (req.method === "POST") {
        let form = new IncomingForm()

        form.parse(req, (err, { title, description, content }) => {
            if (err) throw err

            let sql = `INSERT INTO tableArticles (title, description, content) VALUES ( '${title}', '${description}', '${content}' )`

            con.query(sql, (err) => {
                if (err) throw err
                refreshPage(res)
            })
        })
    } else {
        refreshPage(res)

    }
})

server.listen(8080)
console.log("PORT is 8080\n----------------------")
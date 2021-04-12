const http = require("http")
const mysql = require("mysql")
const { accessSync, mkdirSync } = require("fs")
const { IncomingForm } = require("formidable")
const mv = require("mv")

// CREATE CONNECTION TO Example1 DATABASE IN THE LOCAL SERVER
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ararat",
    database: "Example1"
})

// Connect to database
connection.connect((err) => {
    if (err) throw err
    console.log("Connected to database")
})

// RETURNS AN HTML FORM ELEMENT
const formView = () => {
    return (
        `<form action="upload" method="POST" enctype="multipart/form-data">
            <p>
                <input type="text" name="title">
            </p>
            <p>
                <textarea name="description" cols="30" rows="10"></textarea>
            </p>
            <p>
                <textarea name="content" cols="30" rows="10"></textarea>
            </p>
            <p>
                <input type="file" name="image">
            </p>
            <button type="submit">Send</button>
        </form>`
    )
}

// SERVER
const server = http.createServer((req, res) => {
    // if data is received => handle
    // else send back an empty form ro get gata
    if (req.url === "/upload" && req.method === "POST") {
        let form = new IncomingForm()

        // handle received data
        form.parse(req, (err, { title, description, content }, { image }) => {
            if (err) throw err

            // move receiver data to /upload/
            // add received data into databaes Example1 > table1
            // get unique img name
            let date = new Date()
            let y = date.getFullYear()
            let m = date.getMonth()
            let d = date.getDay()
            let h = date.getHours()
            let min = date.getMinutes()
            let sec = date.getSeconds()
            let ext = image.type.split("/")[1]
            let newFileName = `${y}${m}${d}${h}${min}${sec}.${ext}`
            let newFilePath = `${__dirname}/uploads/${newFileName}`

            // if uploads folder is not exist => make it
            try {
                accessSync("./uploads")
            } catch (error) {
                mkdirSync("./uploads")
            }

            // move received image to uploads
            mv(image.path, newFilePath, () => {
                // secure from SQL injections
                title = connection.escape(title)
                description = connection.escape(description)
                content = connection.escape(content)

                // add data to database
                let sql = `INSERT INTO table1 (title, description, content, imgname) VALUES 
                ('${title}', '${description}', '${content}', '${newFileName}')`

                connection.query(sql, (err) => {
                    if (err) throw err

                    res.writeHead(200, { "content-type": "text/html; charset=utf-8;" })
                    res.write("<h3>Saved<h3>")
                    res.end(formView())

                    console.log("Saved to database")
                })
            })
        })
    } else {
        res.writeHead(200, { "content-type": "text/html; charset=utf8;" })
        res.end(formView())
    }
})

server.listen(8080)
console.log("PORT is 8080\n------------------------------------------------")
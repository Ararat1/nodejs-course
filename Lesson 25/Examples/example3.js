const mysql = require("mysql")

// CREATE CONNECTION TO Example1 DATABASE IN THE LOCAL SERVER
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ararat",
    database: "Example1"
})

// IF CONNECTION IS SUCCESSFUL => ADD DATA INTO TABLE table1 IN CONNEDCET DATABASE
connection.connect((err) => {
    if (err) throw err
    console.log("Connected to database 'Example1'")

    // CREATE AN SQL QUERY STRING TO ADD NEW DATA INTO table1
    let sql = `INSERT INTO table1 (title, description, content, imgname) VALUES ('Message', 'Greeting', 'Hello, world!', 'https://via.placeholder.com/150x150')`

    // ADD A DATA TO table1
    connection.query(sql, (err) => {
        if (err) throw err
        console.log("Added to table1")
    })
})
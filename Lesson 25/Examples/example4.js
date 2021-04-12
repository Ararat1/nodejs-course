const mysql = require("mysql")

// CREATE CONNECTION TO Example1 DATABASE IN THE LOCAL SERVER
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ararat",
    database: "Example1"
})

// IF CONNECTION IS SUCCESSFUL => ADD SEVERAL STRINGS INTO table1 TABLE
connection.connect((err) => {
    if (err) throw err
    console.log("Connected to Example1")

    // CREATE AN SQL QUERY STRING TO ADD TWO STRINGS TO table1
    let sql = `INSERT INTO table1 (title, description, content, imgname) VALUES 
    ('Message3', 'Greeting', 'Hello, world!', 'https://via.placeholder.com/150x150'),
    ('Message4', 'Greeting', 'Hello, world!', 'https://via.placeholder.com/150x150')`

    // ADD DATA TO THE TABLE
    connection.query(sql, (err) => {
        if (err) throw err
        console.log("Completed")
    })
})
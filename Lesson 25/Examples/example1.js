const mysql = require("mysql")

// CONNECT TO MYSQL SERVER
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ararat"
})

// CONNECT TO SERVER AND CREATE NEW DATABASE
connection.connect((err) => {
    // if there are errors => show them
    if (err) throw err
    else console.log("Connected");

    // create a new database called Example1
    let sql = `CREATE DATABASE IF NOT EXISTS Example1`

    connection.query(sql, (err) => {
        if (err) throw err
        console.log("Created")
    })
})
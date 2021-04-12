// type "npm run homework2.js to run"
import mysql from "mysql"

// create connection to ararat database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ararat",
    database: "ararat"
})

// if connection is successful => create a new table called users
connection.connect((err) => {
    if (err) throw err
    console.log("Connected to ararat database")

    // SQL query string to create a table with columns: id, name, email, number
    let sql = `CREATE TABLE IF NOT EXISTS users (
        id int auto_increment primary key,
        name varchar(255) not null,
        email varchar(255) not null,
        number varchar(255) not null
    )`

    // create a new table
    connection.query(sql, (err) => {
        if (err) throw err
        console.log("Table is created..!")
    })
})
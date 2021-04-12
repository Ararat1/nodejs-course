// type "npm run homework3.js to run"
import mysql from "mysql"

// create connection to ararat database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ararat",
    database: "ararat"
})

// if connection is successful => insert data into users table
connection.connect((err) => {
    if (err) throw err
    console.log("Connected to ararat database")

    // SQL query string to insert data into users table
    let sql = `INSERT INTO users (name, email, number) VALUES (
        'Ararat',
        'matinyan_0@mail.ru',
        '+37488888888'
    )`

    // create a new table
    connection.query(sql, (err) => {
        if (err) throw err
        console.log("Data is inserted..!")
    })
})
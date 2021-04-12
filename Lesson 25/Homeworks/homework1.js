// TYPE "npm run homework1.js" to run
import mysql from "mysql"

// connect to mysql local server
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ararat"
})

// if connection is successful => create a new database
connection.connect((err) => {
    if (err) throw err
    console.log("Connected..!")

    // SQL query string to creating database called ararat
    let sql = `CREATE DATABASE IF NOT EXISTS ararat`

    connection.query(sql, (err) => {
        if (err) throw err
        console.log("Database is created..!")
    })
})
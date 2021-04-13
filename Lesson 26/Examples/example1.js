// type "npm run example1" to start executing this program
import mysql from "mysql"

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

    // get data from database
    let sql = "SELECT * FROM tableinfo WHERE id=3"

    con.query(sql, (err, result) => {
        if (err) throw err

        console.log(result[0].name)
    })
})

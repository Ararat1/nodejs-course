const mysql = require("mysql")

// CREATE CONNECTION TO DATABASE Example1 IN LOCAL SERVER
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ararat",
    database: "Example1"
})

// IF CONNECTION IS SUCCESSFUL => CREATE A NEW TABLE CALLED table1 WITH SOME FIELDS
// table1 fields: id, title, description, content, imgname
connection.connect((err) => {
    if (err) throw err;
    console.log("Connected")

    // create an sql query for creating new table called table1
    let sql = `CREATE TABLE IF NOT EXISTS table1 (
        id int auto_increment primary key,
        title varchar(288) not null,
        description varchar(288) not null,
        content varchar(288) not null,
        imgname varchar(288) not null
    )`

    // create a new table
    connection.query(sql, (err) => {
        if (err) throw err
        console.log("Created new table")
    })
})
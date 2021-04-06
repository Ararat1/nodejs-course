const { readFile } = require("fs")

readFile("./deleted.txt", "utf-8", (err, data) => {
    if (err) throw err

    console.log(data)
})
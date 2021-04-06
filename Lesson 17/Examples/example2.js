const fs = require('fs')

fs.readFile("./file.txt", "UTF-8", (err, data) => {
    if (err) console.log(err.message);

    console.log("Async: ", data)

    let text = fs.readFileSync('./file.txt', "UTF-8")
    console.log("Sync: ", text);

})
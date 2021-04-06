const { cpus } = require("os");
const { writeFile } = require('fs')

const random = () => Math.floor(Math.random() * 10)

let filename = ""
let data = `${cpus().length}`

for (let i = 0; i < 8; i++) {
    filename += random()

    if (i === 7) filename += ".txt"
}

writeFile(filename, data, () => console.log("Written.."))
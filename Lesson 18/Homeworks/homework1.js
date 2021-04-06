const { createWriteStream } = require("fs")

const writeStream = createWriteStream("homework1.txt")

writeStream.write(`${new Date()}\n\n`)
writeStream.end(JSON.stringify(process.versions, null, 4))
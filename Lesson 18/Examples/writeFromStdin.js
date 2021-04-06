const { createWriteStream } = require("fs")

const writeStream = createWriteStream("arguments.txt")

process.stdin.pipe(writeStream)
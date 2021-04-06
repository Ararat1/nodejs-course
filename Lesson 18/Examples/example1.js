const { createWriteStream } = require("fs")

const myName = "Ararat Matinyan"

const writeStream = createWriteStream("example1.txt")

writeStream.write(myName)
writeStream.end(`\n${myName.length}`)
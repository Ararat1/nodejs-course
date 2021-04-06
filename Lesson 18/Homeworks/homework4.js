const { createWriteStream } = require("fs")

let writeableStream = createWriteStream("homework4.txt")

let expressionsCount = 0

console.log("Type here...")

process.stdin.on("data", data => {
    writeableStream.write(`${data}`)

    expressionsCount++

    if (expressionsCount == 5) process.exit()
})
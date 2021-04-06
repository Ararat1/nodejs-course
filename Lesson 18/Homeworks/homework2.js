const { createReadStream } = require("fs")

let readableStream = createReadStream("./input.txt", { highWaterMark: 1024 })
readableStream.setEncoding("utf-8")

readableStream.on("data", chunk => {
    const pattern = /[^a-z0-9\s]/i

    if (!pattern.test(chunk)) console.log(chunk);
})
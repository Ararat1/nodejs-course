const { createReadStream } = require("fs")

const readStream = createReadStream("./input.txt", { highWaterMark: 512 })
readStream.setEncoding("utf-8")

let i = 0;

readStream.on("data", (chunk) => console.log(`Chunk ${i++}:\n${chunk}\n`))
readStream.on("end", () => console.log("Reading is finished..!"))
const { createReadStream, createWriteStream } = require("fs")

const readStream = createReadStream("lorem.txt", { highWaterMark: 16 })
readStream.setEncoding("utf-8")

const writeStream = createWriteStream("editedLorem.txt")

// const handleDataEvent = chunk => writeStream.write(`${chunk}\n`, "utf-8", (e) => console.log(e))
const handleDataEvent = chunk => writeStream.write(`${chunk}\n`, "utf-8", () => console.log("End of Writing..!"))
const handleEndEvent = () => console.log("End of Reading..!")

readStream.on("data", handleDataEvent)
writeStream.end()
readStream.on("end", handleEndEvent)
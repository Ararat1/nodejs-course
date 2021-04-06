const { createReadStream, createWriteStream } = require("fs");
const { Transform } = require("stream");

const rStream = createReadStream("./homeworkr5.txt", { highWaterMark: 1 })
const wStream = createWriteStream("homeworkw5.txt")

const filter = new Transform({
    readableObjectMode: true,
    writableObjectMode: true,

    transform(chunk, encoding, callback) {
        try {
            let pattern = /[^A-Za-z0-9\s]/
            let transformedChunk = chunk.toString().replace(pattern, "")
            callback(null, transformedChunk)
        } catch (error) {
            callback(error)
        }
    }
})

rStream
    .pipe(filter)
    .pipe(wStream)
    .on("finish", () => wStream.end())
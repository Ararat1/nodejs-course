const { createReadStream, createWriteStream } = require("fs")
const { Transform } = require("stream")

const rStream = createReadStream("./input.txt")
const wStream = createWriteStream("homework4.txt")

const arrayFromString = new Transform({
    readableObjectMode: true,

    transform(chunk, encoding, callback) {
        try {
            let result = chunk.toString().split("\n")
            callback(null, JSON.stringify(result))
        } catch (error) {
            callback(errors)
        }
    }
})

const evenRows = new Transform({
    readableObjectMode: true,

    transform(chunk, encoding, callback) {
        try {
            let evenRows = JSON.parse(chunk).filter((_, index) => index % 2)
            callback(null, JSON.stringify(evenRows))
        } catch (error) {
            callback(error)
        }
    }
})

const stringFromArray = new Transform({
    readableObjectMode: true,
    writableObjectMode: true,

    transform(chunk, encoding, callback) {
        try {
            let rows = JSON.parse(chunk)
            let result = rows.join("\n")
            callback(null, result)
        } catch (error) {
            callback(error)
        }
    }
})


rStream
    .pipe(arrayFromString)
    .pipe(evenRows)
    .pipe(stringFromArray)
    .pipe(wStream)
    .on("finish", () => wStream.end())
const { Transform } = require("stream");

const inStream = new Transform({
    read() { }
})

inStream.push("ABC,DCC,ABS,DSC")
inStream.push("EDC,EDU,TTT,SAA")

const commaSplitter = new Transform({
    readableObjectMode: true,

    transform(chunk, encoding, callback) {
        try {
            let result = chunk.toString().trim().split(",")
            callback(null, result)
        } catch (error) {
            callback(error)
        }
    }
})

const objectFromArray = new Transform({
    readableObjectMode: true,
    writableObjectMode: true,

    transform(chunk, encoding, callback) {
        try {
            const obj = {}

            for (let i = 0; i < chunk.length; i += 2) {
                obj[chunk[i]] = chunk[i + 1]
            }

            callback(null, obj)
        } catch (error) {
            callback(error)
        }
    }
})

const stringFromObject = new Transform({
    writableObjectMode: true,

    transform(chunk, encoding, callback) {
        try {
            let result = JSON.stringify(chunk)
            callback(null, result)
        } catch (error) {
            callback(error)
        }
    }
})

inStream
    .pipe(commaSplitter)
    .pipe(objectFromArray)
    .pipe(stringFromObject)
    .pipe(process.stdout)
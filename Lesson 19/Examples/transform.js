const { Transform } = require("stream")

const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        try {
            let transformedChunk = chunk.toString().toUpperCase()
            callback(null, transformedChunk)
        } catch (error) {
            callback(error)
        }
    }
})

const lowerCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        try {
            let transformedChunk = chunk.toString().toLowerCase()
            callback(null, transformedChunk)
        } catch (error) {
            callback(error)
        }
    }
})

process.stdin.pipe(upperCaseTransform).pipe(process.stdout)
process.stdin.pipe(lowerCaseTransform).pipe(process.stdout)
const { createReadStream } = require("fs")

const readStream = createReadStream("./video.mp4", {
    highWaterMark: (1024 * 1024)
})

readStream.on("data", (chunk) => console.log(chunk.length))

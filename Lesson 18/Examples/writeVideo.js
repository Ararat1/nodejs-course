const { createReadStream, createWriteStream } = require("fs")

const readStream = createReadStream("./video.mp4")
const writeStream = createWriteStream("./newVideo.mp4")

// readStream.on("data", (chunk) => writeStream.write(chunk))
readStream.pipe(writeStream)
readStream.on("end", () => console.log("Video has been copied..!"))
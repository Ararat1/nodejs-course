const { createWriteStream } = require("fs")

const writeStream = createWriteStream("hello.txt")
writeStream.setDefaultEncoding("ascii")

for (let i = 0; i < 10000; i++) writeStream.write("Hello, world!" + i + "\n")
writeStream.end()

writeStream.on("drain", chunk => console.log(chunk))
writeStream.on("finish", () => console.log("Finished..!!"))
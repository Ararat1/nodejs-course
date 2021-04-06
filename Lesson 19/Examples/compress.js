// This code reads "file.txt", compresses the streaming data on the fly, and writes it to "file.txt.gz"

const { createReadStream, createWriteStream } = require("fs")
const { createGzip } = require("zlib")

const gzip = createGzip()
const rStream = createReadStream("file.txt")
const wStream = createWriteStream("file.txt.gz")

rStream // reads from "file.txt"
    .pipe(gzip) // compresses
    .pipe(wStream) // writes to file.txt.gz
    .on("finish", () => console.log("Compressing has been finished..!")) // finished
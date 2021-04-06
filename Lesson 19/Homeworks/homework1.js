const { createReadStream, createWriteStream } = require("fs")
const { createGunzip } = require("zlib")

const gunzip = createGunzip()

const rStream = createReadStream("./homeworks.txt.gz")
const wStream = createWriteStream("homework1.txt")

rStream // reads from "homeworks.txt.gz"
    .pipe(gunzip) // uncompresses
    .pipe(wStream) // writes to "homework1.txt"
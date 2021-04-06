const { createReadStream, createWriteStream } = require("fs")
const { scryptSync, createDecipheriv } = require("crypto")

const password = process.version

const algorithm = "aes-256-cbc"
const key = scryptSync(password, "salt", 32)
const iv = Buffer.alloc(16)

const deCipher = createDecipheriv(algorithm, key, iv)

const rStream = createReadStream("./homework2c.txt")
const wStream = createWriteStream("homework3.txt")

rStream
    .pipe(deCipher)
    .pipe(wStream)
    .on("finish", () => console.log("Decoding is done..!"))

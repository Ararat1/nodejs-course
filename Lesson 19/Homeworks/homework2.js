const { createReadStream, createWriteStream } = require("fs")
const { scryptSync, createCipheriv } = require("crypto")

const password = process.version

const algorithm = "aes-256-cbc"
const key = scryptSync(password, "salt", 32)
const iv = Buffer.alloc(16)

const cipher = createCipheriv(algorithm, key, iv)

const rStream = createReadStream("./homeworks.txt")
const wStream = createWriteStream("homework2c.txt")

rStream
    .pipe(cipher)
    .pipe(wStream)
    .on("finish", () => "Finished..!")
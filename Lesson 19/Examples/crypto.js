const { createReadStream, createWriteStream } = require("fs")
const { scryptSync, createCipheriv } = require("crypto")

const password = "Ararat_Matinyan_Vanadzor"

const algorithm = "aes-256-cbc" // get password from safe store
const key = scryptSync(password, "salt", 32)
const iv = Buffer.alloc(16, 0)

const cipher = createCipheriv(algorithm, key, iv)

const rStream = createReadStream("file1.txt")
const wStream = createWriteStream("file1.encryped")

rStream
    .pipe(cipher)
    .pipe(wStream)
    .on("finish", () => console.log("Encoding is done..!"))
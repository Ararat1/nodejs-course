const { createWriteStream } = require("fs")

const multiple4or5Stream = createWriteStream("multiple4or5.txt")
const multiple7or9Stream = createWriteStream("multiple7or9.txt")

for (let i = 0; i <= 1000; i++) {
    if (!(i % 4) || !(i % 5)) multiple4or5Stream.write(`${i}\n`)

    if (!(i % 7) || !(i % 9)) multiple7or9Stream.write(`${i}\n`)
}

multiple4or5Stream.end()
multiple7or9Stream.end()
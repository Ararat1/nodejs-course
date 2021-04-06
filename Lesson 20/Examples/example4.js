const { createWriteStream, statSync, renameSync } = require("fs")

const wStream = createWriteStream("example4.txt")

for (let i = 0; i < 150; i++) {
    wStream.write("SUNNY SCHOOL")
}

wStream.end()

wStream.on("finish", () => {
    let { size } = statSync("./example4.txt")
    let newFileName = ""

    if (size > 1024) newFileName = "more1kB.txt"
    else newFileName = "less1kB.txt"

    renameSync("./example4.txt", newFileName)
})

const { readFileSync, writeFileSync, unlinkSync } = require("fs")

try {
    let text = readFileSync("./homework3.txt", "utf-8")
    let replacedText = text.replace(/[^a-z0-9\s]/gim, "")

    writeFileSync("replace.txt", replacedText)

    unlinkSync("./homework3.txt")
} catch (error) {
    console.log(error.message)
}
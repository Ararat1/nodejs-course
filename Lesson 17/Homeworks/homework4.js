const { readFile, writeFile } = require("fs")

readFile("./text.txt", "UTF-8", (err, text) => {
    if (err) throw err

    text = text.replace(/\s/g, "-")

    writeFile("processedText.txt", text, () => console.log("Replaced!!"))
})
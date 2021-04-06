const { writeFile, writeFileSync } = require("fs")

let data = "New content for new file\n"

// Async
// writeFile("newFile.txt", data, {}, (err) => console.log("Written..!"))

// Sync
try {
    writeFileSync("newFile.txt", data, { flag: "a+" })
    console.log("Written..!")
} catch (error) {
    console.log(error)
}
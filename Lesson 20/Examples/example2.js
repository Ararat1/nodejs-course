const { existsSync, mkdirSync, writeFileSync } = require("fs")

const Course = {
    folderName: "NodeJS",
    fileName: "node.json"
}

try {
    let { folderName, fileName } = Course

    if (!existsSync(folderName)) mkdirSync(folderName)

    writeFileSync(`./${folderName}/${fileName}`, JSON.stringify(Course))
} catch (err) {
    console.log(err.message)
}
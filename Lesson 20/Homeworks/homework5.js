const { readdirSync, mkdirSync, statSync, existsSync, renameSync } = require("fs")

try {
    if (!existsSync("newDir")) mkdirSync("newDir")

    let files = readdirSync("./")

    files.forEach(file => {
        let { size } = statSync(file)

        if (size > 1024) renameSync(file, `newDir/${file}`)
    })
} catch (error) {
    console.log(error.message)
}
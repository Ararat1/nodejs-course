const { appendFileSync, readdir, statSync, unlinkSync } = require("fs")

readdir("./Example5", (err, files) => {
    if (err) throw err

    files.forEach(file => {
        let { size, birthtime } = statSync(`./Example5/${file}`)

        if (size < 1024) {
            let info = `${file}\n`
            info += `${birthtime}\n\n`

            appendFileSync("deleted.txt", info)
            unlinkSync(`./Example5/${file}`)
        }
    })
})
const { rmdir, unlink } = require("fs")

unlink("./NodeJS/node.json", (err) => {
    if (err) throw err

    rmdir("./NodeJS", (err) => {
        if (err) throw err

        console.log("Removed..!")
    })
})


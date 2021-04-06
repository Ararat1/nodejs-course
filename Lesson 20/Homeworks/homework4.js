const { existsSync, mkdirSync, writeFileSync } = require("fs")

const WEB = ['html', 'css', 'js', 'php']

try {
    if (!existsSync("./WEB")) mkdirSync("WEB")

    WEB.forEach(item => {
        let fileName = `${item}.${item}`
        writeFileSync(`./WEB/${fileName}`, item)
    })
} catch (error) {
    console.log(error.message)
}

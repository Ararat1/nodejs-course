const { readFile, appendFile } = require('fs')
const { userInfo } = require('os')

let userName = userInfo().username
let now = new Date()
let fileName = `${userName}_${now.getDay()}_${now.getMonth()}_${now.getFullYear()}.txt`

readFile("./file.txt", "UTF-8", (err, data) => {
    if (err) throw err

    let newText = `${data} | ${new Date()}\n`

    appendFile(fileName, newText, (err) => {
        if (err) throw err

        console.log('Written!!!')
    })
})

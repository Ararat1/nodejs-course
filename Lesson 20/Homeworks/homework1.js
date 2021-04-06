const { writeFile } = require("fs")
const { userInfo } = require("os")

let info = userInfo()
let { username: fileName } = info

writeFile(`${fileName}.txt`, JSON.stringify(info, null, 2), err => { if (err) throw err })
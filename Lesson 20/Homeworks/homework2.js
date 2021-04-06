const { renameSync } = require("fs")
const { userInfo } = require("os")

let d = new Date()
let month = d.getMonth()
let day = d.getDay()
let h = d.getHours()
let m = d.getMinutes()
let s = d.getSeconds()

let newFileName = `${month}_${day}_${h}_${m}_${s}.txt`
let oldFileName = `${userInfo().username}.txt`

try {
    renameSync(oldFileName, newFileName)
} catch (error) {
    console.log(error.message)
}
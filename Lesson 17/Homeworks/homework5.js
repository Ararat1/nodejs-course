const { platform } = require("os")
const { readFileSync, appendFileSync } = require("fs")

// Creating New File Name
let now = new Date()
let h = now.getHours()
let m = now.getMinutes()
let s = now.getSeconds()

let filename = `${platform()}_${h}_${m}_${s}.js`

// Homeworks
const homework1 = readFileSync("./homework1.js", "UTF-8")
const homework2 = readFileSync("./homework2.js", "UTF-8")
const homework3 = readFileSync("./homework3.js", "UTF-8")
const homework4 = readFileSync("./homework4.js", "UTF-8")

// Writing homeworks into a new file
let separator = "\n\n\n// "

for (let i = 0; i < 45; i++) separator += "-"

separator += "\n"

appendFileSync(filename, homework1 + separator, () => "Homework 1 is written..")
appendFileSync(filename, homework2 + separator, () => "Homework 2 is written..")
appendFileSync(filename, homework3 + separator, () => "Homework 3 is written..")
appendFileSync(filename, homework4, () => "Homework 4 is written..")
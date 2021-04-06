const { statSync } = require("fs")

let { size } = statSync("./examples.txt")

console.log(`${size / 1024}kB`);
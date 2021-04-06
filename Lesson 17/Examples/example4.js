const { totalmem, freemem } = require('os')

let total = totalmem()
let free = freemem()

let freeMemPercent = ((total - free) / total) * 100

console.log(freeMemPercent)
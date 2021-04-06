const { totalmem } = require('os')

let gb = totalmem() / 1024 / 1024 / 1024 // byte -> kilobyte -> megabyte -> gigabyte

console.log(`RAM is ${Math.ceil(gb)}GB`)
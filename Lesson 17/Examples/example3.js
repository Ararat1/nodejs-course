const { readFileSync, writeFileSync } = require('fs')

// read file.txt in UTF-8 format to get it as string, otherwise boofer text
const text = readFileSync("./file.txt", 'UTF-8')

// text is a string and we make that's symbols upper case
const upperText = text.toUpperCase()

// text with upper case symbols are wrote into upperCase.txt
writeFileSync("upperText.txt", upperText)
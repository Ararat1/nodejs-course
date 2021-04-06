const armLetters = {
    "ա": "a",
    "բ": "b",
    "գ": "g",
    "դ": "d",
    "ե": "e",
    "զ": "z",
    "է": "e",
    "ը": "@",
    "թ": "t",
    "ժ": "j",
    "ի": "i",
    "լ": "l",
    "խ": "x",
    "ծ": "c",
    "կ": "k",
    "հ": "h",
    "ձ": "dz",
    "ղ": "gh",
    "յ": "y",
    "ն": "n",
    "շ": "sh",
    "ո": "vo",
    "չ": "ch",
    "պ": "p",
    "ջ": "dzh",
    "ռ": "r",
    "ս": "s",
    "վ": "v",
    "տ": "t",
    "ռ": "r",
    "ց": "c",
    "ւ": "u",
    "փ": "p",
    "ք": "q",
    "և": "ev",
    "օ": "o",
    "ֆ": "f"
}

const { createReadStream, createWriteStream } = require("fs")

const armTextStream = createReadStream("./textARM.txt", { highWaterMark: 1 })
armTextStream.setEncoding("utf-8")

const engTextStream = createWriteStream("textENG.txt")

armTextStream.on("data", (chunk) => {
    let char = chunk.toString().trim().toLowerCase()

    let translatedChar = armLetters[char] || char

    engTextStream.write(translatedChar)
})

armTextStream.on("end", () => engTextStream.end())
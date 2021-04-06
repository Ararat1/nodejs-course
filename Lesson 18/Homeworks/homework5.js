const { createReadStream, createWriteStream } = require("fs")

let readableStream = createReadStream("./homework5ENG.txt", { highWaterMark: 1 })
readableStream.setEncoding("utf-8")

let writeableStream = createWriteStream("homework5AM.txt")

readableStream.on("data", chunk => {
    let data;

    switch (chunk.toLowerCase()) {
        case "a":
            data = "ա"
            break;
        case "b":
            data = "բ"
            break;
        case "c":
            data = "գ"
            break;
        case "d":
            data = "դ"
            break;
        case "e":
            data = "ե"
            break;
        case "f":
            data = "ֆ"
            break;
        case "g":
            data = "գ"
            break;
        case "h":
            data = "հ"
            break;
        case "i":
            data = "ի"
            break
        case "j":
            data = "ջ"
            break;
        case "k":
            data = "կ"
            break;
        case "l":
            data = "լ"
            break;
        case "m":
            data = "մ"
            break;
        case "n":
            data = "ն"
            break;
        case "o":
            data = "օ"
            break;
        case "p":
            data = "պ"
            break;
        case "q":
            data = "ք"
            break;
        case "r":
            data = "ր"
            break;
        case "s":
            data = "ս"
            break;
        case "t":
            data = "տ"
            break;
        case "u":
            data = "ու"
            break;
        case "v":
            data = "վ"
            break;
        case "w":
            data = "վ"
            break;
        case "x":
            data = "խ"
            break;
        case "y":
            data = "յ"
            break;
        case "z":
            data = "զ"
            break;
        default:
            data = chunk
    }

    writeableStream.write(data)
})
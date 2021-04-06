const { createReadStream } = require("fs")
const EventEmitter = require("events")

const handleHomeworkEvent = () => {
    let homeworksFileStream = createReadStream("./homeworks.txt")
    homeworksFileStream.pipe(process.stdout)
}

let eventEmitter = new EventEmitter()

eventEmitter.on("Homework", handleHomeworkEvent)

setTimeout(() => {
    eventEmitter.emit("Homework")
}, 1500);
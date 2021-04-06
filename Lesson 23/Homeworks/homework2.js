const EventEmitter = require("events")

let i = 1

let eventEmitter = new EventEmitter()

const handleEvent3Event = () => {
    if (i <= 3) console.log(i++)
    else eventEmitter.removeListener("event3", handleEvent3Event)
}

eventEmitter.on("event3", handleEvent3Event)

setInterval(() => {
    eventEmitter.emit("event3")
}, 1000);
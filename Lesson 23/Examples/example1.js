const { EventEmitter } = require("events")

const handleTimeEvent = () => {
    let date = new Date()
    let h = date.getHours()
    let m = date.getMinutes()

    console.log(`${h}:${m}`)
}

let eventEmitter = new EventEmitter()

eventEmitter.on("time", handleTimeEvent)

setTimeout(() => {
    eventEmitter.emit("time")
}, 1000);
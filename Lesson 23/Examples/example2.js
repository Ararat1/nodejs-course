const EventEmitter = require("events")

const eventEmitter = new EventEmitter()

const handleMultipleEvent = (num) => console.log(num ** 2)

eventEmitter.on("multiple", handleMultipleEvent)

setTimeout(() => {
    eventEmitter.emit("multiple", 8)
}, 1000);

setTimeout(() => {
    eventEmitter.emit("multiple", 34)
}, 3000);

setTimeout(() => {
    eventEmitter.emit("multiple", 19)
}, 4000);
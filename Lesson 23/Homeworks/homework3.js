const EventEmitter = require("events");

class Apples extends EventEmitter {
    constructor(rest = 0) {
        super()
        this.rest = rest
    }

    static handleBuyEvent() {
        console.log(this.rest)
    }

    buy(count) {
        this.rest -= count
    }
}

let green = new Apples(7)

green.on("buy", Apples.handleBuyEvent.bind(green))

green.buy(3)
green.buy(2)

setTimeout(() => {
    green.emit("buy")
}, 1000);
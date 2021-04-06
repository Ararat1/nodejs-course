const EventEmitter = require("events")

class Person extends EventEmitter {
    constructor(name, surname) {
        super()
        this.name = name
        this.surname = surname
    }

    get fullName() {
        return `${this.name} ${this.surname}`
    }
}

let egor = new Person("Egor", "Rybakov")

egor.on("name", function () { console.log(this.fullName) })
egor.on("name", () => console.log(this.fullName)) // undefined, bcause this isn't exist

setTimeout(() => {
    egor.emit("name")
}, 1000);
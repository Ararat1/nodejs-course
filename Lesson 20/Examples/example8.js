const { rename } = require("fs")

rename("./f1.txt", "./f2.txt", () => console.log("Renaing is done..!"))
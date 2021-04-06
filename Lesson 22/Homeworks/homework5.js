const http = require("http")
const { readFileSync } = require("fs")

const server = http.createServer((req, res) => {
    let data = readFileSync("./homeworks.txt", "utf-8")
    let tasks = data.split(/\n/)
        .map((task => { if (task !== "") return `<p hidden>${task}</p>` }))
        .filter(task => task !== undefined)

    let tasksView = readFileSync("./tasksView.html", "utf-8")
    tasksView = tasksView.replace("{tasks}", tasks.join("\n"))

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" })
    res.end(tasksView)
})

server.listen(3000)
console.log("PORT is 3000");
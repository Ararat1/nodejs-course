const data = []

process.stdin.on("data", chunk => {
    if (chunk.toString() === "e()") process.exit()
    data.push(chunk)
})

console.log(data)
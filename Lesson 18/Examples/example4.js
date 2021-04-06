process.stdin.on("data", (data) => {
    let phrase = data.toString().trim()

    if (phrase === "quit") process.exit()

    console.log(phrase.length)
})
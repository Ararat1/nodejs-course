const args = []
// get arguments of process
process.argv.forEach((item, index) => {
    let result = [index, item]
    args.push(result)
})


// print the arguments to console
process.stdout.write(JSON.stringify(args, null, 2)) // <=> console.log(JSON.stringify(args, null, 2))
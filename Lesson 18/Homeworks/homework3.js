const { createWriteStream } = require("fs")

const isPrime = num => {
    for (var i = 2; i < num; i++)
        if (num % i === 0) return false;

    return num > 1;
}

let primeNumbersStream = createWriteStream("prime.txt")
let notPrimeNumbersStream = createWriteStream("notPrime.txt")

for (let i = 0; i <= 1000; i++) {
    let str = `${i}\n`

    if (isPrime(i)) {
        primeNumbersStream.write(str)
        continue
    }

    notPrimeNumbersStream.write(str)
}
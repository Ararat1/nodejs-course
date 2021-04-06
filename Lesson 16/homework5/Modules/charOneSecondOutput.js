const charOneSecondOutput = string => {
    const pattern = /\b\w+\b/g;
    const matches = string.match(pattern);
    let currnetMatch = 0;

    let showInterval = setInterval(() => {
        console.log(matches[currnetMatch]);

        currnetMatch++;

        if (currnetMatch == matches.length) clearInterval(showInterval);
    }, 1000)
};

module.exports = {
    charOneSecondOutput
};
const wordsFromString = string => {
    const pattern = /\b\w+\b/g;
    const matches = string.match(pattern);

    return matches;
}

module.exports = {
    wordsFromString
};
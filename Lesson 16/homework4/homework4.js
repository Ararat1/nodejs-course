const { wordsFromString } = require('./Modules/wordsFromString');

const sentence = "Small talk is light conversation. It can be about the weather, food, anything that isn’t too serious.";

const matches = wordsFromString(sentence);

for (let match of matches) console.log(match);
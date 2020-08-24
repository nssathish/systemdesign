const { match } = require("assert");

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
}

module.exports.getRandomInt = getRandomInt
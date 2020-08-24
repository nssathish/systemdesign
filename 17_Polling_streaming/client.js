const helpers = require('./helpers')
const messagingApi = require('./messaging_api')
const readline = require('readline')

const terminal = readline.createInterface({
    input: process.stdin
})

const displayedMessages = {}

terminal.on('line', text => {
    const username = process.env.NAME
    const id = helpers.getRandomInt(100000)
    displayedMessages[id] = true
    
    const message = {id, text, username}
    messagingApi.sendMessages(message)
})

function displayMessage(message) {
    console.log(`> ${message.username}: ${message.text}`)
    displayedMessages[message.id] = true
}

async function getAndDisplayMessages() {
    const messages = await messagingApi.getMessages()

    for (const message of messages) {
        const messageAlreadyDisplayed = message.id in displayedMessages
        if (!messageAlreadyDisplayed) displayMessage(message)
    }
}

function pollMessages() {
    setInterval(getAndDisplayMessages, 3000)
}

function streamMessages() {
    const messagingSocket = messagingApi.createMessgingSocket()

    messagingSocket.on('message', data => {
        const message = JSON.parse(data)
        const messageAlreadyDisplayed = message.id in displayedMessages
        if (!messageAlreadyDisplayed) displayMessage(message)
    })
}

if (process.env.MODE === 'poll') {
    getAndDisplayMessages()
    pollMessages()
}
else if (process.env.MODE === 'stream') {
    getAndDisplayMessages()
    streamMessages()
}
const axios = require('axios')
const WebSocket = require('ws')

function createMessgingSocket() {
    return new WebSocket('ws://localhost:3001/messages')
}

function getMessages() {
    return axios.get('http://localhost:3001/messages').then(res => res.data)
}

function sendMessages(message) {
  return axios.post('http://localhost:3001/messages', message)
}

module.exports.createMessgingSocket = createMessgingSocket
module.exports.getMessages = getMessages
module.exports.sendMessages = sendMessages
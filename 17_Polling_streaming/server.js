const express = require('express')
const expressWs = require('express-ws')

app = express()
expressWs(app)
app.use(express.json())

const messages = [{id: 0, text: 'Welcome!', username:'Chat room'}]
const sockets = []

app.listen(3001, () => console.log('Listening on port 3001!'))

app.get('/messages', (req, res) => {
    res.json(messages)
})

app.post('/messages', (req, res) => {
    const message = req.body
    messages.push(message)
    
    for (const socket of sockets) {
        socket.send(JSON.stringify(message))
    }
})

app.ws('/messages', socket => {
    sockets.push(socket)

    socket.on('close', () => {
        sockets.splice(sockets.indexOf(socket), 1)
    })
})
const express = require('express')
const fs = require('fs')
const app = new express()
app.use(express.json())

const PORT = process.env.PORT
const DATA_DIR = process.env.DATA_DIR

app.post('/:key', (req, res) => {
    const {key} = req.params
    console.log(`Storing data at key: ${key}.`)
    const destinationFile = `${DATA_DIR}/${key}`
    fs.writeFileSync(destinationFile, req.body.data)
    res.send()
})

app.get('/:key', (req, res) => {
    const {key} = req.params
    console.log(`Receiving data from key: ${key}.`)
    const destinationFile = `${DATA_DIR}/${key}`
    try {
        const data = fs.readFileSync(destinationFile)
        res.send(data)
    } catch (error) {
        res.send('null')
    }
})

app.listen(PORT, () => console.log(`Listening to port ${PORT}!`))

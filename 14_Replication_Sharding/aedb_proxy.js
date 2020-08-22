const axios = require('axios')
const express = require('express')
const app = express()
app.use(express.json())

const SHARD_ADDRESSES = ['http://localhost:3000', 'http://localhost:3001']
const SHARD_COUNT = SHARD_ADDRESSES.length

function getShardEndpoint(key) {
    const shardNumber = key.charCodeAt(0) % SHARD_COUNT
    const shardAddress =  SHARD_ADDRESSES[shardNumber]
    return `${shardAddress}/${key}`
}

app.post('/:key', (req, res) => {
    const shardEndPoint = getShardEndpoint(req.params.key)
    console.log(`Forwarding to shard ${shardEndPoint}`)
    axios.post(shardEndPoint, req.body).then(innerRes => {res.send()})
})

app.get('/:key', (req, res) => {
    const shardEndPoint = getShardEndpoint(req.params.key)
    console.log(`"Forwarding to shard ${shardEndPoint}"`)
    axios.get(shardEndPoint).then(proxyres => {
        if (proxyres.data == null) res.send('null')
        else res.send(proxyres.data)
    })
})

app.listen(8000, () => console.log('Proxy running on 8000'))

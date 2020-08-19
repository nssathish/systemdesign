const express = require('express')
const database = require('./database')
const redis = require('redis').createClient()

const app = express()

app.get('/nocache/index.html', (req,res) => {
    database.get('index.html', page => {
        res.send(page)
    })
})

app.get('/withcache/index.html', (req, res) => {
    redis.get('index.html', (err, reply) => {
        if (reply) {
            res.send(reply)
            return
        }
    })
    database.get('index.html', page => {
        redis.set('index.html', page, 'EX', 10)
        res.send(page)
    })
})

app.listen(3000, () => console.log('Listening on port 3000'))
const express = require('express')
const app = express()

app.listen(process.env.PORT, () => {console.log(`Listening to port ${process.env.PORT}`)})

app.get("/hello", (req,res) => {
    console.log(req.headers)
    res.send(`Hello from port ${process.env.PORT}`)
})
const express = require('express')
const mongoose = require('./config/database')
const app = express()
const cors = require('cors')
const path = require('path')
const router = require('./config/routes')

app.use(express.json())
app.use(cors())
app.use('/api', router)


app.use(express.static(path.join(__dirname, "client/build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"))
})

app.listen(process.env.PORT || 3005, () => {
    console.log('listening on  3005')
})
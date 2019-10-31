const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ticket-master-mvc', { useFindAndModify: false, useNewUrlParser: true })
    .then(() => {
        console.log('connected to db')
    })
    .catch((err) => {
        console.log(err)
    })

module.exports = mongoose
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const department = new Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Department = mongoose.model('Department', department)

module.exports = Department
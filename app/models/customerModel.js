const mongoose = require('mongoose')

const Schema = mongoose.Schema
const customer = new Schema({
    name: {
        type: String,
        requied: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Customer = mongoose.model('Customer', customer)

module.exports = Customer
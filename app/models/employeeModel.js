const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employee = new Schema({
    name: {
        type: String,
        required: true
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
    departmentId: {
        type: Schema.Types.ObjectId,
        ref: 'Department'

    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Employee = mongoose.model('Employee', employee)

module.exports = Employee
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ticket = new Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    customerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    departmentId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    },
    employeesIds: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Employee'
    }],
    priority: {

        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    isResolved: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Ticket = mongoose.model('Ticket', ticket)

module.exports = Ticket
const Ticket = require('../models/ticketModel')

//list
module.exports.list = (req, res) => {
    Ticket.find({ userId: req.user._id, isDeleted: false })
        .populate('departmentId')
        .populate('customerId')
        .populate('employeesIds')

        .then((tickets) => {
            res.json(tickets)

        })
        .catch((err) => {
            res.json(err)
        })
}

//show
module.exports.show = (req, res) => {
    const id = req.params.id
    Ticket.findOne({ _id: id, userId: req.user._id, isDeleted: false }).populate('departmentId')
        .then((ticket) => {
            if (ticket) {
                res.json(ticket)
            }
            else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

//create
module.exports.create = (req, res) => {
    const body = req.body
    if (body.employeesIds.length != 0) {
        const ticket = new Ticket({ ...body, userId: req.user._id })

        ticket.save()
            .then((ticket) => {
                res.json(ticket)
            })
            .catch((err) => {
                res.json(err)
            })
    }
    else {
        res.json({ error: "employees is required" })
    }
}

//delete
module.exports.delete = (req, res) => {
    const id = req.params.id
    Ticket.findOneAndDelete({ _id: id, userId: req.user._id })
        .then((ticket) => {
            if (ticket) {
                res.json(ticket)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

//update
module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body

    Ticket.findOneAndUpdate({ _id: id, userId: req.user._id, isDeleted: false }, body, { new: true, runValidators: true })
        .then((ticket) => {
            if (ticket) {
                res.json(ticket)
            }
            else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}
module.exports.statusChange = (req, res) => {
    const body = req.body
    Ticket.findOne({ _id: body._id, userId: req.user._id, isDeleted: false })
        .then(ticket => {
            ticket.isResolved = body.isResolved
            return ticket.save()
        })
        .then(ticket => {
            res.json(ticket)
        })
        .catch(err => {
            res.json(err)
        })

}

//softdelete
module.exports.softdDelete = (req, res) => {
    const id = req.params.id
    Ticket.findOne({ _id: id, userId: req.user._id })
        .then((ticket) => {
            if (ticket) {
                ticket.isDeleted = true
                Ticket.findOneAndUpdate({ _id: id, userId: req.user._id }, ticket, { new: true, runValidators: true })
                    .then((ticket) => {
                        if (ticket) {
                            res.json(ticket)
                        }
                        else {
                            res.json({})
                        }
                    }).catch((err) => {
                        res.json(err)
                    })
            }
        })
        .catch((err) => {
            res.json(err)
        })
}
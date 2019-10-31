const Customer = require('../models/customerModel')

//list
module.exports.list = (req, res) => {
    Customer.find({ userId: req.user._id })
        .then((customer) => {
            res.json(customer)
        })
        .catch((err) => {
            res.json(err)
        })

}

//create
module.exports.create = (req, res) => {
    const body = req.body
    const customer = new Customer({ ...body, userId: req.user._id })
    customer.save()
        .then((customer) => {
            res.json(customer)
        })
        .catch((err) => {
            res.json(err)
        })

}

//show
module.exports.show = (req, res) => {
    const id = req.params.id
    Customer.findOne({ _id: id, userId: req.user._id })
        .then((customer) => {
            if (customer) {
                res.json(customer)
            }
            else {
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
    Customer.findOneAndUpdate({ _id: id, userId: req.user._id }, body, { new: true, runValidators: true })
        .then((customer) => {
            if (customer) {
                res.json(customer)
            }
            else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

//destroy
module.exports.destroy = (req, res) => {
    const id = req.params.id
    Customer.findOneAndDelete({ _id: id, userId: req.user._id })
        .then((customer) => {
            if (customer) {
                res.json(customer)
            }
            else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}
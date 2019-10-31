const Employee = require('../models/employeeModel')

//list
module.exports.list = (req, res) => {
    Employee.find({ userId: req.user._id }).populate('departmentId')
        .then((employee) => {
            res.json(employee)
        })
        .catch((err) => {
            res.json(err)
        })

}

//create
module.exports.create = (req, res) => {
    const body = req.body
    const employee = new Employee({ ...body, userId: req.user._id })

    employee.save()
        .then((employee) => {
            res.json(employee)
        })
        .catch((err) => {
            res.json(err)
        })
}

//show 
module.exports.show = (req, res) => {
    const id = req.params.id

    Employee.findOne({ _id: id, userId: req.user._id })
        .then((employee) => {
            if (employee) {
                res.json(employee)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json({})
        })
}

//update
module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body

    Employee.findOneAndUpdate({ _id: id, userId: req.user._id }, body, { new: true, runValidators: true })
        .then((employee) => {
            if (employee) {
                res.json(employee)
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

    Employee.findOneAndDelete({ _id: id, userId: req.user._id })
        .then((employee) => {
            if (employee) {
                res.json(employee)
            }
            else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}
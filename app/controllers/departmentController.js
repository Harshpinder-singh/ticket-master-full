const Department = require('../models/departmentModel')

//list
module.exports.list = (req, res) => {
    Department.find({ userId: req.user._id })
        .then(department => {
            res.json(department)
        })
        .catch((err) => {
            res, json(err)
        })
}

//create
module.exports.create = (req, res) => {
    const body = req.body
    const department = new Department({ ...body, userId: req.user._id })
    department.save()
        .then((department) => {
            res.json(department)
        })
        .catch((err) => {
            res.json(err)
        })
}

//show
module.exports.show = (req, res) => {
    const id = req.params.id
    Department.findOne({ _id: id, userId: req.user._id })
        .then((department) => {
            if (department) {
                res.json(department)
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
    Department.findOneAndUpdate({ _id: id, userId: req.user._id }, body, { new: true, runValidators: true })
        .then((department) => {
            if (department) {
                res.json(department)
            }
            else {
                res.json(department)
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

//destroy
module.exports.destroy = (req, res) => {
    const id = req.params.id
    Department.findOneAndDelete({ _id: id, userId: req.user._id })
        .then((department) => {
            if (department) {
                res.json(department)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

const { User } = require('../models/user')

//localhost:3005/users/register
module.exports.register = function (req, res) {
    const body = req.body
    const user = new User(body)
    user.save()
        .then((user) => {
            res.json({ _id: user._id, username: user.username, email: user._id })
        })
        .catch((err) => {
            res.send(err)

        })
}




// private route
module.exports.account = (req, res) => {
    const { user } = req
    res.send(user)



}

module.exports.logout = function (req, res) {
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
        .then(() => {
            res.send({ notice: 'successfully logged out' })
        })
        .catch((err) => {
            res.send(err)
        })
}
//login
module.exports.login = (req, res) => {
    const body = req.body
    const ip = req.ip

    User.findByCredentials(body.email, body.password)
        .then((user) => {
            return user.generateToken()
        })
        .then((user) => {
            console.log('user  ', user)
            res.json(user)

        })
        .catch((err) => {
            res.send(err)
        })

}

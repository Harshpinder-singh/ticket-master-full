const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5

    },
    ips: [{
        type: String,
        default: ''
    }],
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)
            },
            message: function () {
                return 'invalid email'
            }
        }
        //how to check the format of the emil
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128
    },

    tokens: [
        {
            token: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
})
//pre hooks , before saving to db this method gets called
userSchema.pre('save', function (next) {
    const user = this
    console.log('user new ', user)
    if (user.isNew) {
        bcryptjs.genSalt(10)
            .then((salt) => {
                bcryptjs.hash(user.password, salt)
                    .then((encryptedpass) => {
                        user.password = encryptedpass
                        user.skills = ''
                        user.hobbies = ''
                        next()
                    })
            })



    } else {
        next()
    }

})

userSchema.statics.findByToken = function (token) {
    const user = this
    let tokenData
    try {
        tokenData = jwt.verify(token, 'jwt@123')
    }
    catch (err) {
        return Promise.reject(err)

    }
    return User.findOne({
        _id: tokenData._id,
        'tokens.token': token
    })
}

//own static method
userSchema.statics.findByCredentials = function (email, password) {
    const User = this
    return User.findOne({ email })
        .then((user) => {
            if (user) {
                return bcryptjs.compare(password, user.password)
                    .then((result) => {
                        if (result) {
                            return Promise.resolve(user)
                        } else {
                            return Promise.reject('invalid email / password')
                        }
                    })

            }
            else {
                return Promise.reject('invalid email / password')
            }

        })
        .catch((err) => {
            return Promise.reject(err)
        })
}

//own instance method
userSchema.methods.generateToken = function () {
    const user = this
    const tokenData = {
        _id: user._id,
        username: user.username,
        createdAt: Number(new Date())
    }
    const token = jwt.sign(tokenData, 'jwt@123')
    user.tokens.push({
        token
    })

    return user.save()
        .then((user) => {
            return Promise.resolve({ _id: user._id, username: user.username, token: token })
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}

const User = mongoose.model('User', userSchema)

module.exports = {
    User
}
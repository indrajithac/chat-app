const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bycrypt = require('bcrypt')


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter something"]
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "Enter something"],
        index: true,
        validate: [isEmail, "Invalid Email"]
    },
    password: {
        type: String,
        required: [true, "Enter something"],

    },
    picture: {
        type: String
    },
    newMessage: {
        type: Object,
        default: {}
    },
    status: {
        type: String,
        default: 'online'
    }

}, {
    minimize: false,
    // capped: { size: 1024 },
    // bufferCommands: false,
    // autoCreate: false
})

UserSchema.pre('save', function (next) {
    const user = this
    if (!user.isModified('password')) return next()

    bycrypt.genSalt(function (err, salt) {
        if (err) return next(err)

        bycrypt.hash(user.password, salt, function (err, hash) {
            if (err) return (err)

            user.password = hash
            next()
        })
    })
})

UserSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    return userObject
}

UserSchema.statics.findByCredentials = async function (email, password) {
    const user = await User.findOne({ email })
    if (!user) throw new Error("invalid email")

    const isMatch = await bycrypt.compare(password, user.password)
    if (!isMatch) throw new Error("invalid password")
    return user

}

const User = mongoose.model('User', UserSchema)

module.exports = User
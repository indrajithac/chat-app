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

}, { minimize: false })

const User=mongoose.model('User',UserSchema)

module.exports=User
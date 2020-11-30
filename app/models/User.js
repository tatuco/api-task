'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const TasK = require('./Task')
const Schema = mongoose.Schema

const User = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es requerido']
    },
    password: {
        type: String,
        required: [true, 'password requerida']
    }
})

User.methods.toJSON = function () {
    let user = this
    let userObject = user.toObject()
    delete userObject.password
    return userObject
}

User.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hashSync(user.password, 10)
    }
    next()
})

module.exports = mongoose.model('User', User)

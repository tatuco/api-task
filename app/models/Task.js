'use strict'
const mongoose = require('mongoose')
const {getPriority} = require("../core/Utils");
const Schema = mongoose.Schema
const Task = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    expiredAt: {
        type: Date,
        require: true,
        default: Date.now()
    },
    createdAt: {
        type: Date,
        require: true,
        default: Date.now()
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User",
    },
    priority: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'E'],
        default: 'C'
    }, //['EMERGENCIA','URGENCIA', 'NECESARIO', 'DESEABLE', 'PRORROGABLE']
    status: {
        type: String,
        enum: ['PENDIENTE', 'REALIZADO'],
        default: 'PENDIENTE'
    }
})

Task.methods.toJSON = function () {
    let task = this
    let object = task.toObject()
    object.status = getPriority(object.status)
    return object
}

module.exports = mongoose.model('Task', Task)


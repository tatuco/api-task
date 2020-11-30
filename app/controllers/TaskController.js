const {setPriority, errorHandler, getPriority} = require("../core/Utils")
const Task = require('../models/Task')
const TaskController = {}

TaskController.store = async (req, res, next) => {
    const user = res.locals.jwtPayload
    let data = req.body
    data.userId = user.id
    data.priority = setPriority(data.priority)
    const task = new Task(data)
    try {
        await task.save();
        return res.status(201).send({
            data: task
        })
    } catch (e) {
        errorHandler(e, req, res, next)
    }
}

TaskController.index = async (req, res, next) => {
    try {
        const tasks = await Task.find({
            userId: res.locals.jwtPayload.id,
          //  status: { $lt: '2020-11-27T22:47:59.811Z' }
        }).select('name description status priority expiredAt createdAt')
            .sort({priority: 'desc', expiredAt: 'asc'})
        return res.status(200).send({
            data: tasks.map((i) => {
                i.priority = getPriority(i.priority)
                return i
            })
        })
    } catch (e) {
        errorHandler(e, req, res, next)
    }
}

TaskController.taksPending = async (userId) => {
    try {
        const tasks = await Task.find({
            userId,
            expiredAt: { $lt: '2020-11-27T22:47:59.811Z' }
        }).select('name description status priority expiredAt createdAt')
            .sort({priority: 'desc', expiredAt: 'asc'})
        return tasks.map((i) => {
                i.priority = getPriority(i.priority)
                return i
            })
    } catch (e) {
        return false
    }
}

TaskController.destroy = async (req, res, next) => {
    try {
        await Task.findOneAndDelete({
            _id: req.params.id,
            userId: res.locals.jwtPayload.id,
        });
        return res.status(204).send({})
    } catch (e) {
        errorHandler(e, req, res, next)
    }
}

TaskController.update = async (req, res, next) => {
    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ["status", "priority", "name", "description"]
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
        if (!isValidOperation)
            throw {message: 'Datos Invalidos', status: 404}
        const task = await Task.findOne({_id: req.params.id})
        if (!task)
            throw {message: 'no Encontrado', status: 404}
        updates.forEach((update) => (task[update] = req.body[update]))
        await task.save()
        return res.status(200).send({
            data: task
        })
    } catch (e) {
        errorHandler(e, req, res, next)
    }
}

module.exports = TaskController

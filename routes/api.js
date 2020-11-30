'use strict'
const AuthController = require("../app/controllers/auth/AuthController")
const TaskController = require("../app/controllers/TaskController")
const JwtMiddleware = require("../app/middleware/JwtMiddleware")

const Router = require('express').Router()

Router.post('/login', AuthController.login)
Router.post('/register', AuthController.register)
Router.post('/tasks', JwtMiddleware, TaskController.store)
Router.get('/tasks', JwtMiddleware, TaskController.index)
Router.put('/tasks/:id', JwtMiddleware, TaskController.update)
Router.delete('/tasks/:id', JwtMiddleware, TaskController.destroy)

module.exports = Router

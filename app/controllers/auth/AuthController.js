const {errorHandler} = require("../../core/Utils");
const jwt = require('jsonwebtoken')
const {JWT_KEY, JWT_EXPIRE} = require('../../../config/config')
const User = require('../../models/User')
const bcrypt = require('bcrypt')
const TaskController = require("../TaskController");

const AuthController = {}

AuthController.login = async (req, res, next) => {
    const body = req.body
    User.findOne({email: body.email}, async (err, data) => {
        try {
            if (err)
                throw new Error('Ocurrio un error en la consulta del usuario')
            if (!data)
                throw new Error('El correo no existe')

            if (!bcrypt.compareSync(body.password, data.password))
                throw new Error('Datos Incorrectos')

            const token = jwt.sign({
                id: data._id, name: data.name, email: data.email
            }, JWT_KEY, {expiresIn: "5d"})
            const tasks = await TaskController.taksPending(data._id)
            res.status(200).json({
                message: 'Autenticado con Existo',
                token: token,
                user: data,
                tasks
            })
        } catch (e) {
            errorHandler(e, req, res, next)
        }
    })

}

AuthController.register = (req, res, next) => {

    const body = req.body
    const user = new User({
        name: body.name,
        email: body.email,
        password: body.password
    })

    user.save((err, data) => {
        try {
            if (err) {
                console.log(err)
                throw {message: `Error al guardar usuario`, status: 500}
            }
            return res.status(201).send({
                message: 'Usuario Creado',
                data: data
            })
        } catch (e) {
            errorHandler(e, req, res, next)
        }
    })

}

module.exports = AuthController

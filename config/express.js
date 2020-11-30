'use strict'

const express = require('express')
const http = require('http')
const app = express()//instancia de express
const server = http.createServer(app)//creando el server con http y express como handle request
const path = require('path')
const helmet = require("helmet")
const cors = require("cors")
const compression = require("compression")
const morgan = require('morgan')
const routes = require('../app/core/RouterProvider')
const {errorHandler} = require('../app/core/Utils')
app.use(express.static(path.join(__dirname, '../public')))//middleware de express para archivos estaticos
app.use(compression())
app.use(cors())
app.use(helmet())
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'))
app.use(express.json({limit: "10mb"}))
app.use("/", routes)
app.use(errorHandler)
app.use(function (req, res) {
    res.status(404).send({
        message: "Recurso " + req.url + " no Encontrado"
    });
});
module.exports = server

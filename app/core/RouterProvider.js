'use strict'
const fs = require('fs')
const path = require('path')
const Router =  require("express").Router()
fs.readdirSync(path.resolve(__dirname + '../../../routes')).forEach(function(file) {
    const name = file.split(".")[0]
    const routes = require('../../routes/' + name)
    Router.use(`/${name}`, routes)
});

module.exports = Router

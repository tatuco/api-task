const mongoose = require('mongoose')
const {DB_HOST, DB_NAME} = require('../config/config')
const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}
mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`, config, error => {
    if (error) {
        console.log(`Error en la conexion con Mongo.`)
        process.exit(0)
    } else
        console.log(`Base de Datos ${DB_NAME} conectada.`)
})

module.exports = mongoose

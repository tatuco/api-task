const dotenv = require('dotenv')
const path = require('path')
dotenv.config({
    path: path.resolve(__dirname, `../${process.env.NODE_ENV}.env`)
})
module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 3000,
    JWT_KEY: process.env.JWT_KEY || '123',
    JWT_EXPIRE: process.env.JWT_EXPIRE || 3600,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_NAME: process.env.DB_NAME || 'default'
}

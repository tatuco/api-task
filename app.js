'use strict'
const server = require('./config/express')
const config = require('./config/config')
require('./database/mongodb')
server.listen(config.PORT, () => {
    console.log(`Server running running port \x1b[32m%s\x1b[0m`, config.PORT)
})

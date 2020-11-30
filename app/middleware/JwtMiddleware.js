const {errorHandler} = require("../core/Utils")
const jwt = require("jsonwebtoken")
const {JWT_KEY} = require("../../config/config")
const JwtMiddleware = (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        if (!token)
            throw {message: "Es necesario el token de autenticación", status: 401}
        token = req.headers.authorization.replace("Bearer ", "")
        const jwtPayload = jwt.verify(token, JWT_KEY)
        res.locals.jwtPayload = jwtPayload
        next()
    } catch (e) {
        errorHandler(e, req, res, next)
    }
}

module.exports = JwtMiddleware

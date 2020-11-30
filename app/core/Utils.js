'use strict'
module.exports.errorHandler = function errorHandler(err, req, res, next) {
    if (process.env.NODE_ENV.indexOf("development") !== -1) {
        console.log(err);
        return res.status(err.code ? err.code: err.status || 500).json({
            status: err.code ? err.code: err.status || 500,
            message: err.message || "Error Server",
        });
    } else {
        return res.status(err.code ? err.code: err.status || 500).json({
            status: err.code ? err.code: err.status || 500,
            message: err.message || "Error Server",
        });
    }
}

module.exports.getPriority = (value) => {
    switch (value) {
        case 'A':
            return 'EMERGENCIA'
            break
        case 'B':
            return 'URGENCIA'
            break
        case 'C':
            return 'NECESARIO'
            break
        case 'D':
            return 'DESEABLE'
            break
        case 'E':
            return 'PRORROGABLE'
            break
    }
}

module.exports.setPriority = (value) => {
    switch (value) {
        case 'EMERGENCIA':
            return 'A'
            break
        case 'URGENCIA':
            return 'B'
            break
        case 'NECESARIO':
            return 'C'
            break
        case 'DESEABLE':
            return 'D'
            break
        case 'PRORROGABLE':
            return 'E'
            break
    }
}

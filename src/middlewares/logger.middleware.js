const { v4: uuidv4 } = require('uuid')
const winston = require('winston')

const logger = winston.createLogger({
    format: winston.format.json(),
    defaultMeta: {
        service: 'events-platform',
    },
    transports: [
        new winston.transports.Console()
    ]
})

function loggerMiddleware() {
    return (ctx, next) => {
        const requestId = uuidv4()
        ctx.state.logger = logger.child({
            requestId
        })
        ctx.set('X-Request-Id', requestId)
        return next()
    }
}

module.exports = { logger, loggerMiddleware }
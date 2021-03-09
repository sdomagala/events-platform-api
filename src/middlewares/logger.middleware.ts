import { Next } from 'koa'
import { v4 as uuidv4 } from 'uuid'
import winston from 'winston'
import { RequestContext } from '../interfaces/request-context.interface'

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
    return (ctx: RequestContext, next: Next) => {
        const requestId = uuidv4()
        ctx.state.logger = logger.child({
            requestId
        })
        ctx.set('X-Request-Id', requestId)
        return next()
    }
}

export { logger, loggerMiddleware }
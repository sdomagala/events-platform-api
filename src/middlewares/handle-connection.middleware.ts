import { Next } from 'koa'
import { createConnection } from '../helpers/connection.helper'
import { RequestContext } from '../interfaces/request-context.interface'

function handleConnectionMiddleware() {
    const connection = createConnection()
    return (ctx: RequestContext, next: Next) => {
        const { logger } = ctx.state
        logger.info('Attached connection to request')
        ctx.state.connection = connection
        return next()
    }
}

export { handleConnectionMiddleware }
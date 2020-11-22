import { createConnection } from '../helpers/connection.helper'

function handleConnectionMiddleware() {
    const connection = createConnection()
    return (ctx, next) => {
        const { logger } = ctx.state
        logger.info('Attached connection to request')
        ctx.state.connection = connection
        return next()
    }
}

export { handleConnectionMiddleware }
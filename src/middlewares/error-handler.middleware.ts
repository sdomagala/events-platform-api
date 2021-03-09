import { Next } from "koa"
import { RequestContext } from "../interfaces/request-context.interface"

function errorHandlerMiddleware() {
    return async (ctx: RequestContext, next: Next) => {
        try {
            return await next()
        } catch (e) {
            const { logger } = ctx.state
            const log = logger || console
            log.error(`Error returned: ${e.message}`)
            if (typeof e.getErrorDetails === 'function') {
                const { code, message } = e.getErrorDetails()
                ctx.status = code
                ctx.body = { message }
            } else {
                ctx.status = 500
                ctx.body = { message: 'Internal Server Error' }
            }
        }
    }
}

export { errorHandlerMiddleware }
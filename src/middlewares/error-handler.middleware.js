function errorHandlerMiddleware() {
    return async (ctx, next) => {
        try {
            return await next()
        } catch (e) {
            console.log(`Error returned:`, e.message)
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

module.exports = { errorHandlerMiddleware }
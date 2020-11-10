const { createConnection } = require('../helpers/connection.helper')

function handleConnectionMiddleware() {
    const connection = createConnection()
    return (ctx, next) => {
        ctx.state.connection = connection
        return next()
    }
}

module.exports = { handleConnectionMiddleware }
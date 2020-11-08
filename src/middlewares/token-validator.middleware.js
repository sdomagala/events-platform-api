const { validateToken } = require('../services/jwt.service')

async function tokenValidatorMiddleware(ctx, next) {
    const token = ctx.headers['authorization'] && ctx.headers['authorization'].split(' ')[1]
    if (token && await validateToken(token)) {
        console.log('User validated')
        next()
    } else {
        ctx.status = 401
        ctx.body = 'Unauthorized'
    }
}

module.exports = { tokenValidatorMiddleware }
import { validateToken } from '../services/jwt.service'
import { UnauthorizedException } from '../exceptions/unauthorized.exception'

async function tokenValidatorMiddleware(ctx, next) {
    const token = ctx.headers['authorization'] && ctx.headers['authorization'].split(' ')[1]
    if (token) {
        const user = await validateToken(token)
        ctx.state.user = user
        console.log('User validated')
        return next()
    } else {
        throw new UnauthorizedException('Unauthorized')
    }
}

export { tokenValidatorMiddleware }
import Router from '@koa/router'
import { RequestState } from '../interfaces/request-context.interface'
import { createUser, validateUser } from '../services/users.service'

const userMgmtController = new Router<RequestState>()

userMgmtController.post('/register', async (ctx) => {
    const body = await createUser(ctx)
    ctx.body = body
})

userMgmtController.post('/login', async (ctx) => {
    const body = await validateUser(ctx)
    ctx.body = body
})

export { userMgmtController }
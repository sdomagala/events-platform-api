const Router = require('@koa/router')
const { tokenValidatorMiddleware } = require('../middlewares/token-validator.middleware')
const { createUser, validateUser } = require('../services/users.service')

const userMgmtController = new Router()

userMgmtController.post('/register', async (ctx) => {
    const body = await createUser(ctx)
    ctx.body = body
})

userMgmtController.post('/login', async (ctx) => {
    const body = await validateUser(ctx)
    ctx.body = body
})

userMgmtController.post('/validate', tokenValidatorMiddleware, async (ctx) => {
    ctx.body = await connection('users').select()
})

module.exports = { userMgmtController }
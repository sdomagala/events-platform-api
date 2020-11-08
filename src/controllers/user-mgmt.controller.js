const Router = require('@koa/router')
const { createToken } = require('../services/jwt.service')
const { tokenValidatorMiddleware } = require('../middlewares/token-validator.middleware')
const { v4: uuidv4 } = require('uuid')

const userMgmtController = new Router()

userMgmtController.post('/register', async (ctx) => {
    const userId = uuidv4()
    const token = await createToken(userId)
    ctx.body = { token }
})

userMgmtController.post('/login', (ctx) => {
    ctx.body = ctx.request.body
})

userMgmtController.post('/validate', tokenValidatorMiddleware, (ctx) => {
    ctx.body = 'User logged in'
})

module.exports = { userMgmtController }
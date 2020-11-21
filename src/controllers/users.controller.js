const Router = require('@koa/router')
const { getAllUsers, getUser, updateUser, deleteUser } = require('../services/users.service')
const { tokenValidatorMiddleware } = require('../middlewares/token-validator.middleware')

const userController = new Router()

userController.get('/users', async (ctx) => {
    ctx.body = await getAllUsers(ctx)
})

userController.get('/users/:userId', async (ctx) => {
    const userId = ctx.request.params.userId
    ctx.body = await getUser(userId, ctx)
})

userController.put('/users/:userId', async (ctx) => {
    const userId = ctx.request.params.userId
    const { name, surname } = ctx.request.body
    ctx.body = await updateUser(userId, { name, surname }, ctx)
})

userController.del('/users/:userId', tokenValidatorMiddleware, async (ctx) => {
    const userId = ctx.request.params.userId
    await deleteUser(userId, ctx)
    ctx.status = 204
})

module.exports = { userController }
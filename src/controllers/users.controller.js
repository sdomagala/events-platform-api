const Router = require('@koa/router')
const { getAllUsers, getUser } = require('../services/users.service')

const userController = new Router()

userController.get('/users', async (ctx) => {
    ctx.body = await getAllUsers(ctx)
})

userController.get('/users/:userId', async (ctx) => {
    const userId = ctx.request.params.userId
    ctx.body = await getUser(userId, ctx)
})

module.exports = { userController }
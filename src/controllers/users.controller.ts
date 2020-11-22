import Router from '@koa/router'
import { getAllUsers, getUser, updateUser, deleteUser } from'../services/users.service'
import { tokenValidatorMiddleware } from'../middlewares/token-validator.middleware'

const userController = new Router()

userController.get('/users', async (ctx) => {
    ctx.body = await getAllUsers(ctx)
})

userController.get('/users/:userId', async (ctx) => {
    const userId = ctx.params.userId
    ctx.body = await getUser(userId, ctx)
})

userController.put('/users/:userId', async (ctx) => {
    const userId = ctx.params.userId
    const { name, surname } = ctx.body
    ctx.body = await updateUser(userId, { name, surname }, ctx)
})

userController.del('/users/:userId', tokenValidatorMiddleware, async (ctx) => {
    const userId = ctx.params.userId
    await deleteUser(userId, ctx)
    ctx.status = 204
})

export { userController }
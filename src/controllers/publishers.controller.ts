import Router from "@koa/router"
import { RequestState } from "../interfaces/request-context.interface"
import { tokenValidatorMiddleware } from "../middlewares/token-validator.middleware"
import { createPublisher, getAllPublishers } from "../services/publishers.services"

const publishersController = new Router<RequestState>()

publishersController.post('/publishers', tokenValidatorMiddleware, async (ctx) => {
    const body = await createPublisher(ctx)
    ctx.body = body
})

publishersController.get('/publishers', async (ctx) => {
    const body = await getAllPublishers(ctx)
    ctx.body = body
})

export { publishersController }
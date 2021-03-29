import Router from "@koa/router"
import { RequestState } from "../interfaces/request-context.interface"
import { tokenValidatorMiddleware } from "../middlewares/token-validator.middleware"
import { createEvent, ensureUserEligibilityToPublisher, getEventsByPublisher } from "../services/events.service"

const eventsController = new Router<RequestState>()

eventsController.post('/events', tokenValidatorMiddleware, async (ctx) => {
    const userId = ctx.state.user?.userId as number
    const { publisherId } = ctx.request.body
    await ensureUserEligibilityToPublisher(userId, publisherId, ctx)
    const body = await createEvent(ctx)
    ctx.body = body
})

eventsController.get('/publishers/:publisherId/events', async (ctx) => {
    const publisherId = ctx.params.publisherId
    const body = await getEventsByPublisher(publisherId, ctx)
    ctx.body = body
})

export { eventsController }
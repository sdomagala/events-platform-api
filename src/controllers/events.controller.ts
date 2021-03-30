import Router from "@koa/router"
import { RequestState } from "../interfaces/request-context.interface"
import { tokenValidatorMiddleware } from "../middlewares/token-validator.middleware"
import { createEvent, deleteEvent, ensureUserEligibilityToPublisher, getAllEvents, getEventsByPublisher } from "../services/events.service"

const eventsController = new Router<RequestState>()

eventsController.post('/events', tokenValidatorMiddleware, async (ctx) => {
    const body = await createEvent(ctx)
    ctx.body = body
})

eventsController.get('/publishers/:publisherId/events', async (ctx) => {
    const publisherId = ctx.params.publisherId
    const body = await getEventsByPublisher(publisherId, ctx)
    ctx.body = body
})

eventsController.get('/events', async (ctx) => {
    const body = await getAllEvents(ctx)
    ctx.body = body
})

eventsController.del('/events/:eventId', tokenValidatorMiddleware, async (ctx) => {
    const eventId = ctx.params.eventId
    await deleteEvent(eventId, ctx)
    ctx.status = 204
})

export { eventsController }
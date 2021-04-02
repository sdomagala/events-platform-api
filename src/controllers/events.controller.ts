import Router from "@koa/router"
import { RequestState } from "../interfaces/request-context.interface"
import { tokenValidatorMiddleware } from "../middlewares/token-validator.middleware"
import { createAttendee, createEvent, deleteAttendee, deleteEvent, ensureUserEligibilityToPublisher, getAllEvents, getEventAttendees, getEventsByPublisher } from "../services/events.service"

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

eventsController.post('/events/:eventId/attendees', tokenValidatorMiddleware, async (ctx) => {
    const eventId = ctx.params.eventId
    const body = await createAttendee(eventId, ctx)
    ctx.body = body
})

eventsController.get('/events/:eventId/attendees', async (ctx) => {
    const eventId = ctx.params.eventId
    const body = await getEventAttendees(eventId, ctx)
    ctx.body = body
})

eventsController.del('/events/:eventId/attendees/:userId', tokenValidatorMiddleware, async (ctx) => {
    const eventId = ctx.params.eventId
    const userId = ctx.params.userId
    await deleteAttendee(eventId, userId, ctx)
    ctx.status = 204
})

export { eventsController }
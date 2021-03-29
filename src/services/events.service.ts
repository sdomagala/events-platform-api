import { ForbiddenException } from "../exceptions/forbidden.exception";
import { RequestContext } from "../interfaces/request-context.interface";
import { APIEvent, createEventRecord, getAllEventRecords, getEventsRecordsByPublisher } from "../repositories/events.repository";
import { getDbPublisherRecordById } from "../repositories/publishers.repository";



export async function ensureUserEligibilityToPublisher(userId: number, publisherId: string, ctx: RequestContext) {
    const publisher = await getDbPublisherRecordById(publisherId, ctx)
    if (publisher.owner_id !== userId) {
        throw new ForbiddenException('Trying to access publisher that\'s not yours')
    }
}

export async function createEvent(ctx: RequestContext): Promise<{ id: number }> {
    const { name, description, publisherId, startDate, endDate } = ctx.request.body
    if (!ctx.state.user) {
        throw new ForbiddenException('User not authorized')
    }
    const [id] = await createEventRecord({ name, description, publisher_id: publisherId, start_date: startDate, end_date: endDate }, ctx)
    return { id }
}

export async function getEventsByPublisher(publisherId: string, ctx: RequestContext): Promise<APIEvent[]> {
    return getEventsRecordsByPublisher(publisherId, ctx)
}

export async function getAllEvents(ctx: RequestContext): Promise<APIEvent[]> {
    return getAllEventRecords(ctx)
}
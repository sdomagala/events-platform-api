import { ForbiddenException } from "../exceptions/forbidden.exception"
import { RequestContext } from "../interfaces/request-context.interface"
import { APIPublisher, createPublisherRecord, getPublisherRecordById, getPublishersRecords } from "../repositories/publishers.repository"

export async function createPublisher(ctx: RequestContext): Promise<{ id: number }> {
    const { name } = ctx.request.body
    if (!ctx.state.user) {
        throw new ForbiddenException('User not authorized')
    }
    const [id] = await createPublisherRecord({ name, owner_id: 5 }, ctx)
    return { id }
}

export function getAllPublishers(ctx: RequestContext): Promise<APIPublisher[]> {
    return getPublishersRecords(ctx)
}

export function getPublisher(publisherId: string, ctx: RequestContext): Promise<APIPublisher> {
    return getPublisherRecordById(publisherId, ctx)
}
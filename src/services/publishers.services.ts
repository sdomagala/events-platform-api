import { ForbiddenException } from "../exceptions/forbidden.exception"
import { RequestContext } from "../interfaces/request-context.interface"
import { APIPublisher, createPublisherRecord, deletePublisherRecord, getDbPublisherRecordById, getPublisherRecordById, getPublishersRecords } from "../repositories/publishers.repository"

export async function createPublisher(ctx: RequestContext): Promise<{ id: number }> {
    const { name } = ctx.request.body
    if (!ctx.state.user) {
        throw new ForbiddenException('User not authorized')
    }
    const [id] = await createPublisherRecord({ name, owner_id: ctx.state.user.userId }, ctx)
    return { id }
}

export function getAllPublishers(ctx: RequestContext): Promise<APIPublisher[]> {
    return getPublishersRecords(ctx)
}

export function getPublisher(publisherId: string, ctx: RequestContext): Promise<APIPublisher> {
    return getPublisherRecordById(publisherId, ctx)
}

export async function deletePublisher(publisherId: string, ctx: RequestContext): Promise<void> {
    const publisher = await getDbPublisherRecordById(publisherId, ctx)
    if (!(publisher.owner_id === ctx.state.user?.userId)) {
        throw new ForbiddenException('Tried to delete publisher that\'s not yours')
    }
    return deletePublisherRecord(publisherId, ctx)
}
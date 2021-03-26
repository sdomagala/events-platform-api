import { ForbiddenException } from "../exceptions/forbidden.exception"
import { RequestContext } from "../interfaces/request-context.interface"
import { createPublisherRecord } from "../repositories/publishers.repository"

export async function createPublisher(ctx: RequestContext): Promise<{ id: number }> {
    const { name } = ctx.request.body
    if (!ctx.state.user) {
        throw new ForbiddenException('User not authorized')
    }
    const [id] = await createPublisherRecord({ name, owner_id: 5 }, ctx)
    return { id }
}
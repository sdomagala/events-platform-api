import { PublisherNotFoundException } from "../exceptions/publisher-not-found.exception"
import { UnauthorizedException } from "../exceptions/unauthorized.exception"
import { RequestContext } from "../interfaces/request-context.interface"

interface BasePublisher {
    name: string
}

interface PublisherId {
    id: number
}

interface PublisherOwner {
    owner_id: number
}

export type CreatePublisherInput = BasePublisher & PublisherOwner

export type DbPublisher = BasePublisher & PublisherId & PublisherOwner

export type APIPublisher = BasePublisher & PublisherId

export async function createPublisherRecord(user: CreatePublisherInput, ctx: RequestContext): Promise<number[]> {
    const { connection } = ctx.state
    try {
        const id = await connection('publishers').insert(user).returning('id')
        return id
    } catch (e) {
        if (e.code === '23503') {
            throw new UnauthorizedException(`User "${user.owner_id}" is not authorized`)
        }
        throw e
    }
}

export async function getPublishersRecords(ctx: RequestContext): Promise<APIPublisher[]> {
    const { connection } = ctx.state
    const publishers = await connection('publishers').select(['id', 'name'])
    return publishers
}

export async function getPublisherRecordById(publisherId: string, ctx: RequestContext): Promise<APIPublisher> {
    const { connection } = ctx.state
    const publisher = await connection('publishers').select(['id', 'name']).where({ id: publisherId }).first()
    if (!publisher) {
        throw new PublisherNotFoundException()
    }
    return publisher
}
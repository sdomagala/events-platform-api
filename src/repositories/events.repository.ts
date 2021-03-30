import { EventNotFoundException } from "../exceptions/event-not-found.exception"
import { UnauthorizedException } from "../exceptions/unauthorized.exception"
import { RequestContext } from "../interfaces/request-context.interface"


interface BaseEvent {
    name: string
    description: string
    start_date: string
    end_date: string
}

interface EventId {
    id: number
}

interface EventPublisher {
    publisher_id: number
}

export type CreateEventInput = BaseEvent & EventPublisher

export type DbEvent = BaseEvent & EventId & EventPublisher

export type APIEvent = BaseEvent & EventId

const tableName = 'events'

export async function createEventRecord(event: CreateEventInput, ctx: RequestContext): Promise<number[]> {
    const { connection } = ctx.state
    try {
        const id = await connection(tableName).insert(event).returning('id')
        return id
    } catch (e) {
        if (e.code === '23503') {
            throw new UnauthorizedException(`Publisher "${event.publisher_id}" is not authorized`)
        }
        throw e
    }
}

export async function getEventsRecordsByPublisher(publisherId: string, ctx: RequestContext): Promise<APIEvent[]> {
    const { connection } = ctx.state
    const events = await connection(tableName).select(['id', 'name', 'description', 'start_date', 'end_date']).where({ publisher_id: publisherId })
    return events
}

export async function getDbEventRecord(eventId: string, ctx: RequestContext): Promise<DbEvent> {
    const { connection } = ctx.state
    const event = await connection(tableName).select(['id', 'name', 'description', 'publisher_id', 'start_date', 'end_date']).where({ id: eventId }).first()
    if (!event) {
        throw new EventNotFoundException()
    }
    return event
}

export async function getAllEventRecords(ctx: RequestContext): Promise<APIEvent[]> {
    const { connection } = ctx.state
    const events = await connection(tableName).select(['id', 'name', 'description', 'start_date', 'end_date'])
    return events
}

export async function deleteEventRecord(eventId: string, publisherId: string, ctx: RequestContext): Promise<void> {
    const { connection } = ctx.state
    const [event] = await connection(tableName).delete().where({ id: eventId, publisher_id: publisherId }).returning(['id'])
    if (!event) {
        throw new EventNotFoundException()
    }
}
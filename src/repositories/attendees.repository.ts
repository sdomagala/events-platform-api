import { EventNotFoundException } from "../exceptions/event-not-found.exception"
import { UserAlreadyAttendsEvent } from "../exceptions/user-already-attends-event.exception"
import { UserNotFoundException } from "../exceptions/user-not-found.exception"
import { RequestContext } from "../interfaces/request-context.interface"

interface BaseAttendee {
    user_id: string
    event_id: string
}

interface AttendeeId {
    id: number
}

export type CreateAttendeeInput = BaseAttendee

export type DbAttendee = BaseAttendee & AttendeeId

const tableName = 'event_user_relation'

export async function createAttendeeRecord(eventId: string, userId: number, ctx: RequestContext): Promise<number[]> {
    const { connection } = ctx.state
    try {
        const attendee = await connection(tableName).insert({ event_id: eventId, user_id: userId }).returning('id')
        return attendee
    } catch (e) {
        if (e.code === '23505') {
            throw new UserAlreadyAttendsEvent()
        }
        if (e.code === '23503' && e.detail.includes('not present in table "events".')) {
            throw new EventNotFoundException()
        }
        if (e.code === '23503' && e.detail.includes('not present in table "users".')) {
            throw new UserNotFoundException()
        }
        throw e
    }
}
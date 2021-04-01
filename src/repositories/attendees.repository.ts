import { EventNotFoundException } from "../exceptions/event-not-found.exception"
import { UserAlreadyAttendsEvent } from "../exceptions/user-already-attends-event.exception"
import { UserNotFoundException } from "../exceptions/user-not-found.exception"
import { RequestContext } from "../interfaces/request-context.interface"
import { APIUser } from "./users.repository"

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

export async function getEventAttendeesRecords(eventId: string, ctx: RequestContext): Promise<APIUser[]> {
    const { connection } = ctx.state
    const attendees = await connection(tableName)
        .select(['users.id', 'users.email', 'users.name', 'users.surname'])
        .where({ event_id: eventId })
        .innerJoin('users', `${tableName}.user_id`, 'users.id')
    return attendees
}
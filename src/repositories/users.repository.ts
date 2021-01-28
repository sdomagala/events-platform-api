import { UserAlreadyExistsException } from "../exceptions/user-already-exists.exception"
import { UserNotFoundException } from "../exceptions/user-not-found.exception"

interface BaseUser {
    email: string
    name: string
    surname: string
}

interface UserId {
    id: number
}

interface UserPassword {
    password: string
}

export type CreateUserInput = BaseUser & UserPassword

export type DbUser = BaseUser & UserId & UserPassword

export type APIUser = BaseUser & UserId

async function createUserRecord(user: CreateUserInput, ctx): Promise<string> {
    const { connection } = ctx.state
    try {
        const id = await connection('users').insert(user).returning('id')
        return id
    } catch (e) {
        if (e.code === '23505') {
            throw new UserAlreadyExistsException()
        }
        throw e
    }
}

async function getUserRecordByEmail(email: string, ctx): Promise<DbUser> {
    const { connection } = ctx.state
    const user = await connection('users').where({ email }).first()
    return user
}

async function getUserRecordById(userId: string, ctx): Promise<APIUser> {
    const { connection } = ctx.state
    const user = await connection('users').select(['id', 'email', 'name', 'surname']).where({ id: userId }).first()
    if (!user) {
        throw new UserNotFoundException()
    }
    return user
}

async function getUsersRecords(ctx): Promise<APIUser[]> {
    const { connection } = ctx.state
    const users = await connection('users').select(['id', 'email', 'name', 'surname'])
    return users
}

async function updateUserRecord(userId: string, body: Partial<CreateUserInput>, ctx): Promise<APIUser> {
    const { connection } = ctx.state
    const [user] = await connection('users').update(body).where({ id: userId }).returning(['id', 'email', 'name', 'surname'])
    if (!user) {
        throw new UserNotFoundException()
    }
    return user
}

async function deleteUserRecord(userId: string, ctx): Promise<void> {
    const { connection } = ctx.state
    const [user] = await connection('users').delete().where({ id: userId }).returning(['id', 'email', 'name', 'surname'])
    if (!user) {
        throw new UserNotFoundException()
    }

}

export {
    createUserRecord,
    getUserRecordByEmail,
    getUserRecordById,
    getUsersRecords,
    updateUserRecord,
    deleteUserRecord,
}
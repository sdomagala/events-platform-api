import { UserAlreadyExistsException } from "../exceptions/user-already-exists.exception"
import { UserNotFoundException } from "../exceptions/user-not-found.exception"

async function createUserRecord(user, ctx) {
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

async function getUserRecordByEmail(email, ctx) {
    const { connection } = ctx.state
    const user = await connection('users').where({ email }).first()
    return user
}

async function getUserRecordById(userId, ctx) {
    const { connection } = ctx.state
    const user = await connection('users').select(['id', 'email', 'name', 'surname']).where({ id: userId }).first()
    if (!user) {
        throw new UserNotFoundException()
    }
    return user
}

async function getUsersRecords(ctx) {
    const { connection } = ctx.state
    const users = await connection('users').select(['id', 'email', 'name', 'surname'])
    return users
}

async function updateUserRecord(userId, body, ctx) {
    const { connection } = ctx.state
    const [user] = await connection('users').update(body).where({ id: userId }).returning(['id', 'email', 'name', 'surname'])
    if (!user) {
        throw new UserNotFoundException()
    }
    return user
}

async function deleteUserRecord(userId, ctx) {
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
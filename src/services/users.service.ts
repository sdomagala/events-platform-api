import { createUserRecord, getUserRecordByEmail, getUsersRecords, getUserRecordById, updateUserRecord, deleteUserRecord } from "../repositories/users.repository"
import bcrypt from 'bcrypt'
import { createToken } from "./jwt.service"
import { InvalidCredentialsException } from "../exceptions/invalid-credentials.exception"
import { ForbiddenException } from "../exceptions/forbidden.exception"

async function createUser(ctx) {
    const { email, name, surname, password } = ctx.request.body
    const hash = await bcrypt.hash(password, 10)
    const [id] = await createUserRecord({ email, name, surname, password: hash }, ctx)
    const token = await createToken(id)
    return { token }
}

async function validateUser(ctx) {
    const { email, password } = ctx.request.body
    const user = await getUserRecordByEmail(email, ctx)
    if (!user || !await bcrypt.compare(password, user.password)) {
        throw new InvalidCredentialsException()
    } else {
        const token = await createToken(user.id)
        return { token }
    }
}

function getAllUsers(ctx) {
    return getUsersRecords(ctx)
}

function getUser(userId, ctx) {
    return getUserRecordById(userId, ctx)
}

function updateUser(userId, body, ctx) {
    return updateUserRecord(userId, body, ctx)
}

function deleteUser(userId, ctx) {
    if (!(Number(userId) === ctx.state.user.userId)) {
        throw new ForbiddenException('Tried to delete other user than yourself')
    }
    return deleteUserRecord(userId, ctx)
}

export {
    createUser,
    validateUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
}
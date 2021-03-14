import { createUserRecord, getUserRecordByEmail, getUsersRecords, getUserRecordById, updateUserRecord, deleteUserRecord, APIUser, DbUser, CreateUserInput } from "../repositories/users.repository"
import bcrypt from 'bcrypt'
import { createToken } from "./jwt.service"
import { InvalidCredentialsException } from "../exceptions/invalid-credentials.exception"
import { ForbiddenException } from "../exceptions/forbidden.exception"
import { RequestContext } from "../interfaces/request-context.interface"

async function createUser(ctx: RequestContext): Promise<{ token: string }> {
    const { email, name, surname, password } = ctx.request.body
    const hash = await bcrypt.hash(password, 10)
    const [id] = await createUserRecord({ email, name, surname, password: hash }, ctx)
    const token = await createToken(id)
    return { token }
}

async function validateUser(ctx: RequestContext): Promise<{ token: string }> {
    const { email, password } = ctx.request.body
    const user = await getUserRecordByEmail(email, ctx)
    if (!user || !await bcrypt.compare(password, user.password)) {
        throw new InvalidCredentialsException()
    } else {
        const token = await createToken(user.id)
        return { token }
    }
}

function getAllUsers(ctx: RequestContext): Promise<APIUser[]> {
    return getUsersRecords(ctx)
}

function getUser(userId: string, ctx: RequestContext): Promise<APIUser> {
    return getUserRecordById(userId, ctx)
}

function updateUser(userId: string, body: Partial<CreateUserInput>, ctx: RequestContext): Promise<APIUser> {
    return updateUserRecord(userId, body, ctx)
}

function deleteUser(userId: string, ctx: RequestContext): Promise<void> {
    if (!(Number(userId) === ctx.state.user?.userId)) {
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
const { createUserRecord, getUserRecordByEmail, getUsersRecords, getUserRecordById, updateUserRecord, deleteUserRecord } = require("../repositories/users.repository")

const bcrypt = require('bcrypt')
const { createToken } = require("./jwt.service")
const { InvalidCredentialsException } = require("../exceptions/invalid-credentials.exception")
const { ForbiddenException } = require("../exceptions/forbidden.exception")

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

module.exports = {
    createUser,
    validateUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
}
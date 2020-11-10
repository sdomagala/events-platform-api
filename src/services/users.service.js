const { createUserRecord, getUserRecord } = require("../repositories/users.repository")

const bcrypt = require('bcrypt')
const { createToken } = require("./jwt.service")

async function createUser(ctx) {
    const { email, name, surname, password } = ctx.request.body
    const hash = await bcrypt.hash(password, 10)
    const [id] = await createUserRecord({ email, name, surname, password: hash }, ctx)
    const token = await createToken(id)
    return { token }
}

async function validateUser(ctx) {
    const { email, password } = ctx.request.body
    const user = await getUserRecord(email, ctx)
    if (!user || !await bcrypt.compare(password, user.password)) {
        ctx.status = 401
        return 'Email or password does not exist'
    } else {
        const token = await createToken(user.id)
        return { token }
    }
}

module.exports = {
    createUser,
    validateUser,
}